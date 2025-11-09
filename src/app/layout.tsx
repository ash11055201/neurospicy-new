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
  title: "Neurospicy By John O'Shea | Breaking Down Dyslexia and ADHD Barriers",
  description: "Neurospicy By John O'Shea. A transformative memoir exploring neurodivergence through the lens of 58 years of lived experience. Discover how embracing dyslexia and ADHD as gifts can unlock extraordinary potential and reshape understanding of what it means to have a 'spicy brain'.",
  keywords: "dyslexia, ADHD, neurodivergent, John O'Shea, spicy brain, neurospicy, book, memoir, inspiration, neurodivergence, learning differences, ADHD support, dyslexia support, memoir, autobiography",
  authors: [{ name: "John O'Shea" }],
  icons: {
    icon: '/book-cover.jpg',
    apple: '/book-cover.jpg',
    shortcut: '/book-cover.jpg',
  },
  openGraph: {
    title: "Neurospicy By John O'Shea | Breaking Down Dyslexia and ADHD Barriers",
    description: "Neurospicy By John O'Shea. A transformative memoir exploring neurodivergence through the lens of 58 years of lived experience. Discover how embracing dyslexia and ADHD as gifts can unlock extraordinary potential.",
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
    title: "Neurospicy By John O'Shea | Breaking Down Dyslexia and ADHD Barriers",
    description: "Neurospicy By John O'Shea. A transformative memoir exploring neurodivergence through 58 years of lived experience. Discover the power of embracing your 'spicy brain'.",
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
    google: "XGq9r78E32gxEHgBDHUyprs57LbWnXq0qeFKDiRnny0",
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
        <meta name="google-site-verification" content="XGq9r78E32gxEHgBDHUyprs57LbWnXq0qeFKDiRnny0" />
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
