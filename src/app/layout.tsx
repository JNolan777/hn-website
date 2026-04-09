import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/Toast";
import SkipLink from "@/components/SkipLink";
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
  title: { default: "H&N Hair & Skin \u2013 Purely Gentle, Naturally Effective", template: "%s | H&N Hair & Skin" },
  description: "Handcrafted natural soaps, shampoos, lotions, and hair oils. 100% natural, paraben-free, cruelty-free. By Synergy\u2122.",
  keywords: ["natural soap", "handmade soap", "herbal shampoo", "hair oil", "body lotion", "organic skincare", "H&N", "Synergy"],
  openGraph: {
    title: "H&N Hair & Skin \u2013 Purely Gentle, Naturally Effective",
    description: "18 handcrafted natural hair and skin care products. 100% natural ingredients.",
    type: "website",
    locale: "en_IN",
    siteName: "H&N Hair & Skin",
  },
  twitter: { card: "summary_large_image", title: "H&N Hair & Skin", description: "Handcrafted natural products by Synergy\u2122" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#2d4a2d" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://hn-website-seven.vercel.app"} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "H&N Hair & Skin",
              description: "Handcrafted natural hair and skin care products",
              telephone: "+918867863739",
              url: "https://hn-website-seven.vercel.app",
              priceRange: "\u20B9150 - \u20B9500",
              brand: { "@type": "Brand", name: "H&N Hair & Skin" },
              manufacturer: { "@type": "Organization", name: "Synergy" },
            }),
          }}
        />
      </head>
      <body>
        <SkipLink />
        <CartProvider>
          <ToastProvider>
            <main id="main-content">{children}</main>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
