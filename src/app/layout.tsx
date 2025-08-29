import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import ScrollRestoration from '@/components/scroll-restoration';
import { PageWrapper } from '@/components/page-wrapper';
import { Header } from '@/components/header';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  metadataBase: new URL('https://blacklion.studio'),
  title: {
    default: 'BLACK LION STUDIO | We Craft Digital Experiences That Resonate.',
    template: '%s | BLACK LION STUDIO',
  },
  description: 'A creative powerhouse dedicated to crafting digital experiences that truly resonate. We transform bold visions into precise, high-impact realities.',
  openGraph: {
    title: 'BLACK LION STUDIO',
    description: 'A creative powerhouse dedicated to crafting digital experiences that truly resonate.',
    url: 'https://blacklion.studio',
    siteName: 'BLACK LION STUDIO',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BLACK LION STUDIO",
            "url": "https://blacklion.studio",
            "logo": "https://blacklion.studio/LOGO-LIGHT-MODE.png",
            "sameAs": [
              "https://www.facebook.com/",
              "https://www.twitter.com/",
              "https://www.instagram.com/"
            ]
          })}}
        />
      </head>
      <body className={cn("font-body antialiased")}>
          <PageWrapper>
            <Header />
            <ScrollRestoration />
            {children}
            <Toaster />
            <Analytics />
          </PageWrapper>
      </body>
    </html>
  );
}
