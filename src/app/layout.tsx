import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "H&N Hair & Skin \u2013 Purely Gentle, Naturally Effective",
    template: "%s | H&N Hair & Skin",
  },
  description: "Handcrafted natural soaps, shampoos, lotions, and hair oils by H&N. 100% natural ingredients, paraben-free, cruelty-free. Made with love by Synergy\u2122.",
  keywords: ["natural soap", "handmade soap", "herbal shampoo", "hair oil", "body lotion", "organic skincare", "H&N", "Synergy", "cruelty free", "paraben free"],
  openGraph: {
    title: "H&N Hair & Skin \u2013 Purely Gentle, Naturally Effective",
    description: "Handcrafted natural hair and skin care products. 18 artisan products made with 100% natural ingredients.",
    type: "website",
    locale: "en_IN",
    siteName: "H&N Hair & Skin",
  },
  twitter: {
    card: "summary_large_image",
    title: "H&N Hair & Skin",
    description: "Handcrafted natural hair and skin care products by Synergy\u2122",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#2d4a2d" />
        <link rel="canonical" href="https://hn-website-seven.vercel.app" />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
