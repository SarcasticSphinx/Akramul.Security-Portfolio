import type { Metadata } from "next";
import { Geist_Mono, JetBrains_Mono, Poppins } from "next/font/google";
import "@/app/globals.css";


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
  title: "Admin Login",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetBrainisMono.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
