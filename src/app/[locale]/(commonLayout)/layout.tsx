import Navbar from "@/components/layout/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
