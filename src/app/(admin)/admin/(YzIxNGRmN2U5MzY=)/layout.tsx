import type { Metadata } from "next";
import { Geist_Mono, JetBrains_Mono, Poppins } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "../components/Sidebar";

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
        <div className="flex min-h-screen">
          <aside className="min-w-80 bg-gray-900 text-white p-6">
            {/* Sidebar content */}
            <Sidebar />
          </aside>
          <main className="flex-1 p-8 bg-gray-100 dark:bg-gray-950">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
