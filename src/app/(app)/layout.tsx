import SideNavbar from "@/components/SideNavbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
        <SideNavbar/>
      <main className="flex-1 overflow-y-auto bg-neutral-100 p-6">
        {children}
      </main>
    </div>
  );
}
