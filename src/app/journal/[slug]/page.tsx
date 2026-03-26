import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { JournalEntry } from '@/app/manager/page';

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
    description: entry.excerpt,
  };
}

export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = await getJournalEntryBySlug(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Article Header */}
        <section className="relative px-6 py-24 md:px-12 md:py-32">
          <div className="container mx-auto max-w-screen-md">
            <Link
              href="/journal"
              className="group mb-12 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-destructive transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Journal
            </Link>
            
            <div className="space-y-8">
               <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-2 border-r border-foreground/10 pr-6"><Calendar className="h-4 w-4" /> {entry.date}</span>
                  <span className="flex items-center gap-2"><User className="h-4 w-4" /> {entry.author}</span>
               </div>
               
               <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl leading-[0.9] uppercase">
                  {entry.title}
               </h1>
               
               <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
                  {entry.excerpt}
               </p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 md:px-12 mb-24 md:mb-32">
           <div className="container mx-auto max-w-screen-xl">
              <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] border border-foreground/5 shadow-2xl">
                 <Image 
                    src={entry.imageUrl || '/project-img.jpg'}
                    alt={entry.title}
                    fill
                    priority
                    className="object-cover"
                 />
              </div>
           </div>
        </section>

        {/* Article Content */}
        <article className="px-6 pb-24 md:px-12 md:pb-32">
           <div className="container mx-auto max-w-screen-md">
              <div className="prose prose-invert prose-destructive max-w-none">
                 <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground/80 md:text-base">
                    {entry.content}
                 </div>
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
