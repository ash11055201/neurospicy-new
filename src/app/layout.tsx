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
  title: "Neurospicy - Breaking Down Dyslexia and ADHD Barriers | John O'Shea",
  description: "John O'Shea's inspiring journey with dyslexia and ADHD. A follow-up book exploring 30+ years of experience with neurodivergence, success, challenges, and the power of having a 'spicy brain'.",
  keywords: "dyslexia, ADHD, neurodivergent, John O'Shea, spicy brain, neurospicy, book, memoir, inspiration",
  authors: [{ name: "John O'Shea" }],
  openGraph: {
    title: "Neurospicy - Breaking Down Dyslexia and ADHD Barriers",
    description: "John O'Shea's inspiring journey with dyslexia and ADHD. Discover the power of having a 'spicy brain'.",
    url: "https://neurospicy.life",
    siteName: "Neurospicy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Neurospicy Book Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurospicy - Breaking Down Dyslexia and ADHD Barriers",
    description: "John O'Shea's inspiring journey with dyslexia and ADHD.",
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
