import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { JournalEntry } from '@/app/manager/page';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

async function getJournalEntryBySlug(slug: string): Promise<JournalEntry | null> {
    const q = query(collection(db, "journal"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as JournalEntry;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entry = await getJournalEntryBySlug(params.slug);
  if (!entry) return { title: "Entry Not Found" };

  return {
    title: `${entry.title} | Journal`,
    description: entry.content.substring(0, 160),
  };
}

export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = await getJournalEntryBySlug(params.slug);

  if (!entry) {
    notFound();
  }

  const titleUpper = entry.title.toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Article Header - Project Style */}
        <section className="relative w-full flex flex-col justify-center py-12 md:py-16">
          <div className="absolute inset-0">
            <Image
              src={entry.imageUrl || "/project-img.jpg"}
              alt={entry.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/[.55]" />
          </div>
          <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-screen-xl">
            <Link
              href="/journal"
              className="group mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-destructive transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Journal
            </Link>
            <Separator className="mb-6 md:mb-8 bg-destructive-foreground/30" />
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-destructive-foreground/70">
                    <span className="flex items-center gap-2 border-r border-destructive-foreground/20 pr-6"><Calendar className="h-3 w-3" /> {entry.date}</span>
                    <span className="flex items-center gap-2"><User className="h-3 w-3" /> {entry.author}</span>
                </div>
                <h1 className="font-headline text-3xl font-bold tracking-wide text-destructive-foreground md:text-5xl lg:text-6xl 2xl:text-[5rem] uppercase leading-tight">
                    <span className="text-destructive">{titleUpper.charAt(0)}</span>{titleUpper.slice(1)}
                </h1>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="pt-12 md:pt-16 pb-24 md:pb-32">
           <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
              <div className="prose prose-invert prose-destructive prose-lg max-w-none 
                prose-headings:font-headline prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-foreground prose-headings:mt-12 prose-headings:mb-6
                prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:normal-case prose-p:tracking-normal prose-p:text-base md:prose-p:text-lg
                prose-strong:text-destructive prose-strong:font-bold
                prose-li:text-foreground/80 prose-li:normal-case prose-li:tracking-normal prose-li:text-base md:prose-li:text-lg
                prose-table:border prose-table:border-foreground/10 
                prose-th:bg-foreground/[0.03] prose-th:px-4 prose-th:py-2 prose-th:text-foreground prose-th:font-bold prose-th:uppercase prose-th:tracking-widest prose-th:text-sm md:prose-th:text-base
                prose-td:px-4 prose-td:py-2 prose-td:text-foreground/80 prose-td:normal-case prose-td:tracking-normal prose-td:text-base md:prose-td:text-lg">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {entry.content}
                 </ReactMarkdown>
              </div>
              
              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-16 flex flex-wrap gap-3 border-t border-foreground/5 pt-12">
                   {entry.tags.map((tag, i) => (
                     <span key={i} className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.02] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-colors hover:border-destructive hover:text-destructive">
                        <Tag className="h-3 w-3" /> {tag}
                     </span>
                   ))}
                </div>
              )}
           </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
