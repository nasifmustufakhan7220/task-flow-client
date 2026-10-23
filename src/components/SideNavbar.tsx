"use client";

import { signOut, useSession } from "@/lib/auth-client";
import {
  LayoutDashboard,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const PersonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
  </svg>
);



const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: FolderOpen },
];

const SideNavbar = () => {
  const pathname = usePathname();
  const {data:session} = useSession();
  const router = useRouter();

  const handelSignOut = async()=>{
    await signOut({
      fetchOptions:{
        onSuccess: ()=>{
          router.push("/sign-in");
        }
      }
    })
  }
  return (
    <aside className="w-64 shrink-0 border-r bg-white p-4 flex flex-col justify-between">
      <h1 className="mb-8 text-2xl font-semibold">Nexdo</h1>

      <nav className="flex flex-col gap-1 overflow-y-auto">
        {
          navLinks.map(({href,label, icon:Icon})=>{
            const active = pathname === href || pathname.startsWith(href + "/");

            return(
              <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-neutral-100 font-medium shadow-sm"
                  : "text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
            )
          })
        }
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="w-10 rounded-full bg-indigo-100 text-indigo-600">
                  <PersonIcon className="h-10 w-10" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {
                    session?.user? <>{session?.user?.name}</> : <>Guest user</>
                  }
                </p>
                <p className="truncate text-xs text-slate-500">{session?.user? <>{session?.user?.email}</> : <>Not signed in</>}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {session?.user && (
                <>
                  <button
                    onClick={()=>handelSignOut()}
                    type="button"
                    className="btn btn-sm btn-outline btn-error mt-2 w-full"
                  >
                    Sign out
                  </button>
                </>
              ) }
            </div>
      </div>
    </aside>
  );
};

export default SideNavbar;
