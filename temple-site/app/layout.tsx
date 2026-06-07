import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Aeternal Temple of Obsidian Flame",
    template: "%s | Aeternal Temple of Obsidian Flame",
  },
  description:
    "Where Ancient Wisdom Meets Living Practice. The Aeternal Temple of Obsidian Flame offers courses in Hermeticism, Kabbalah, Alchemy, Ritual Magic, and more esoteric traditions since 1987.",
  keywords: [
    "occult education",
    "hermeticism",
    "kabbalah",
    "alchemy",
    "ritual magic",
    "esoteric studies",
    "mystical arts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
