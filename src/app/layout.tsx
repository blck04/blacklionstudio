import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import ScrollRestoration from '@/components/scroll-restoration';
import { PageWrapper } from '@/components/page-wrapper';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'BLACK LION STUDIO',
  description: 'We craft digital experiences that resonate.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/formula-condensed" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
          <PageWrapper>
            <Header />
            <ScrollRestoration />
            {children}
            <Toaster />
          </PageWrapper>
      </body>
    </html>
  );
}
