import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Ambient from "@/components/layout/Ambient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import MotionProvider from "@/components/ui/MotionProvider";

/* One superfamily across the whole page.
   IBM Plex was commissioned to express engineering and precision — its
   flared stems and squared terminals read technical at any size, where
   Inter and Geist read as the neutral default every product uses.
   Display and body are the same face; the contrast between them comes
   from weight, scale and colour. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexSansBody = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "SellVia — Affiliate Marketing Without The Complexity",
    template: "%s | SellVia",
  },
  description:
    "SellVia connects businesses with creators to build high-performance affiliate partnerships. Turn creators into your sales team.",
  metadataBase: new URL("https://sellvia.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sellvia.com",
    siteName: "SellVia",
    title: "SellVia — Affiliate Marketing Without The Complexity",
    description:
      "SellVia connects businesses with creators to build high-performance affiliate partnerships.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SellVia — Affiliate Marketing Without The Complexity",
    description:
      "SellVia connects businesses with creators to build high-performance affiliate partnerships.",
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
    <html
      lang="en"
      className={`${plexSans.variable} ${plexSansBody.variable}`}
    >
      <body className="antialiased">
        <MotionProvider>
          <Ambient />
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
