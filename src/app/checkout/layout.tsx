import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Buy Neurospicy Book by John O'Shea",
  description: "Purchase Neurospicy by John O'Shea - A powerful memoir about breaking down dyslexia and ADHD barriers. Available in ebook and paperback formats. Join thousands of readers discovering the transformative power of embracing neurodivergence.",
  keywords: "buy neurospicy, purchase neurospicy book, john o'shea book, dyslexia book, ADHD book, neurodivergent memoir, buy online, ebook, paperback",
  robots: {
    index: false, // Don't index checkout pages
    follow: false,
  },
  openGraph: {
    title: "Checkout | Buy Neurospicy Book",
    description: "Purchase Neurospicy by John O'Shea - A powerful memoir about breaking down dyslexia and ADHD barriers. Available in ebook and paperback formats.",
    url: "https://neurospicy.life/checkout",
    type: "website",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

