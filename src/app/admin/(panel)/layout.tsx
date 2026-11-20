import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { countNewQuotes } from "@/lib/data/admin";
import { requireAdmin } from "@/lib/data/auth";

export const metadata: Metadata = {
  title: { absolute: "Espace admin | SK Design" },
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { admin } = await requireAdmin();
  const newQuotes = await countNewQuotes();

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <AdminSidebar email={admin.email} newQuotes={newQuotes} />
      <div className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</div>
    </div>
  );
}
