import { Sidebar } from "@/components/manage/sidebar";
import { requireAdmin } from "@/lib/auth/admin";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce admin-only access for all /manage routes
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <Sidebar />
      <main className="flex-1 ml-72 min-h-screen">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
