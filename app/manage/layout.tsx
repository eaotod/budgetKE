import { Sidebar } from "@/components/manage/sidebar";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <Sidebar />
      <main className="flex-1 ml-72 min-h-screen">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
