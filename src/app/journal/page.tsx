import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { JournalEntry } from '@/app/manager/page';

async function getJournalEntries(): Promise<JournalEntry[]> {
    const q = query(collection(db, "journal"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JournalEntry));
}

export default async function JournalPage() {
  const entries = await getJournalEntries();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Journal Hero */}
        <section className="relative w-full flex flex-col justify-center py-12 md:py-16">
          <div className="absolute inset-0">
            <Image
              src="/project-img.jpg"
              alt="Journal"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/[.35]" />
          </div>
          <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-screen-xl">
            <Link
              href="/"
              className="group mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-destructive transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <Separator className="mb-6 md:mb-8 bg-destructive-foreground/30" />
            <h1 className="font-headline text-5xl font-bold tracking-tighter text-destructive-foreground md:text-7xl lg:text-9xl 2xl:text-[10rem] uppercase">
              <span className="text-destructive">T</span>HE JOURNAL
            </h1>
            <p className="mt-8 max-w-xl text-destructive-foreground/80">
              Insights, perspectives, and architectural thoughts from the creative frontlines.
            </p>
          </div>
          <div className="absolute bottom-10 right-10 z-10 hidden md:block">
            <svg
              width="28"
              height="40"
              viewBox="0 0 28 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-7 text-destructive-foreground/80 animate-bounce"
            >
              <path
                d="M1 21C1 21 12.5818 29.991 14 39C15.4182 29.991 27 21 27 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 1V33"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>

        {/* Journal Grid */}
        <section className="border-t border-foreground/5 pt-12 pb-24 md:pt-16 md:pb-32">
          <div className="container mx-auto px-6 max-w-screen-xl">
            {entries.length > 0 ? (
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <Link 
                    key={entry.id} 
                    href={`/journal/${entry.slug}`}
                    className="group space-y-6"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/5">
                       <Image 
                          src={entry.imageUrl || '/project-img.jpg'}
                          alt={entry.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                    </div>
                    <div className="space-y-3">
                       <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {entry.date}</span>
                          <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {entry.author}</span>
                       </div>
                       <h2 className="font-headline text-2xl font-semibold uppercase leading-tight transition-colors group-hover:text-destructive md:text-3xl">
                          <span className="text-destructive">{entry.title.split(' ')[0]}</span>
                          {entry.title.includes(' ') && ' ' + entry.title.split(' ').slice(1).join(' ')}
                       </h2>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                 <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">No entries found. Stay tuned.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
