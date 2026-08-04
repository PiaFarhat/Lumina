import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina | Private Community Portal",
  description: "A premium residential portal for the Lumina luxury villa community.",
  icons: {
    icon: "/img/logo.png",
    apple: "/img/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
