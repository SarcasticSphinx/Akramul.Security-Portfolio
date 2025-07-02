// app/(admin)/admin/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Dashboard for site admins",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen w-full bg-green-100">
          {children}
        </div>
      </body>
    </html>
  );
}
