import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CartProvider } from "@/contexts/cart-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jennifer Watkins - Mixed Media Artist | New Orleans",
  description: "New Orleans mixed media artist Jennifer Watkins creates handcrafted enamels, ceramics, leather goods, paintings, and textile art. Shop original works and commissions.",
  keywords: ["mixed media artist", "enamel jewelry", "ceramics", "pottery", "leatherwork", "paintings", "textile art", "New Orleans artist", "handcrafted art", "fine craft"],
  authors: [{ name: "Jennifer Watkins" }],
  creator: "Jennifer Watkins",
  openGraph: {
    title: "Jennifer Watkins - Mixed Media Artist | New Orleans",
    description: "New Orleans mixed media artist Jennifer Watkins creates handcrafted enamels, ceramics, leather goods, paintings, and textile art. Shop original works and commissions.",
    type: "website",
    locale: "en_US",
    siteName: "The Conchetta Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jennifer Watkins - Mixed Media Artist | New Orleans",
    description: "New Orleans mixed media artist Jennifer Watkins creates handcrafted enamels, ceramics, leather goods, paintings, and textile art. Shop original works and commissions.",
    creator: "@theconchetta",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var d=(s==='dark')||(!s&&m);var e=document.documentElement;d?e.classList.add('dark'):e.classList.remove('dark');}catch(e){}})();` }} />
      </head>
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
