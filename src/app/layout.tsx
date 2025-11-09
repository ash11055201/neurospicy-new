import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ 
  subsets: ["latin"],
  fallback: ['system-ui', 'arial'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Neurospicy | Breaking Down Dyslexia and ADHD Barriers by John O'Shea",
  description: "Explore John O'Shea's inspiring 58-year journey with dyslexia and ADHD. A powerful memoir sharing experiences of neurodivergence, from bestselling author to Aboriginal community member, world traveler, and founder of educational programs. Discover how embracing your 'spicy brain' can lead to extraordinary achievements.",
  keywords: "dyslexia, ADHD, neurodivergent, John O'Shea, spicy brain, neurospicy, book, memoir, inspiration, neurodivergence, learning differences, ADHD support, dyslexia support, memoir, autobiography",
  authors: [{ name: "John O'Shea" }],
  icons: {
    icon: '/book-cover.jpg',
    apple: '/book-cover.jpg',
    shortcut: '/book-cover.jpg',
  },
  openGraph: {
    title: "Neurospicy | Breaking Down Dyslexia and ADHD Barriers",
    description: "John O'Shea's inspiring 58-year journey with dyslexia and ADHD. A powerful memoir sharing experiences of neurodivergence, success, challenges, and the transformative power of embracing your 'spicy brain'.",
    url: "https://neurospicy.life",
    siteName: "Neurospicy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Neurospicy Book Cover by John O'Shea",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurospicy | Breaking Down Dyslexia and ADHD Barriers",
    description: "John O'Shea's inspiring 58-year journey with dyslexia and ADHD. Discover the power of embracing your 'spicy brain'.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
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
        <link rel="canonical" href="https://neurospicy.life" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" type="image/jpeg" href="/book-cover.jpg" sizes="any" />
        <link rel="apple-touch-icon" href="/book-cover.jpg" />
        <link rel="manifest" href="/manifest.json" />
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/book-cover-mobile.webp" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
