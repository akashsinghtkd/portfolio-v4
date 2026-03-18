import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akash Singh — Fullstack Developer & AI Engineer",
  description:
    "10+ years building production software. Fullstack development, AI integration, SaaS products, and custom automation systems. Let's build something extraordinary.",
  keywords: [
    "Akash Singh",
    "Fullstack Developer",
    "AI Engineer",
    "React",
    "Next.js",
    "Node.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Akash Singh — Fullstack Developer & AI Engineer",
    description:
      "I don't just write code. I engineer solutions. 10+ years of shipping production software.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
