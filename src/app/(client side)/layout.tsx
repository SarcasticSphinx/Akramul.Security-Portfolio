import type { Metadata } from "next";
import { Geist_Mono, JetBrains_Mono, Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/ui/footer-section";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "800"],
});

const jetBrainisMono = JetBrains_Mono({
  variable: "--font-jet-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akram.Security",
  description: "A Portfolio of a Cybersecurity Professional",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetBrainisMono.variable} ${geistMono.variable} ${poppins.variable} antialiased w-full`}
      >
        <Navbar />
        <div className="w-full mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
