"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NAV_PLACEHOLDERS = ["Dashboard", "My Tasks", "Calendar", "Settings"];

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

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default function SideNavbar({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const {data: session } = useSession();
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
    <div className="drawer">
      <input
        id="side-navbar-drawer"
        type="checkbox"
        className="drawer-toggle"
        aria-label="Toggle sidebar"
        checked={open}
        onChange={(e) => setOpen(e.target.checked)}
      />

      <div className="drawer-content relative">
        {!open && (
          <button
            type="button"
            className="btn btn-circle btn-primary fixed left-4 top-4 z-30 shadow-lg"
            aria-label="Open sidebar"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        )}
        {children}
      </div>

      <div className="drawer-side z-40">
        <label
          htmlFor="side-navbar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <aside className="flex min-h-full w-80 max-w-[85vw] flex-col border-r border-slate-200 bg-base-100 p-4 text-base-content shadow-xl sm:w-96">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
                <PersonIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-bold tracking-tight">Task Flow</p>
                <p className="text-xs text-slate-500">Stay organized</p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-circle btn-ghost btn-sm"
              aria-label="Close sidebar"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="divider mt-0 mb-3" />

          {/* Nav — placeholder items only, wire up real routes yourself */}
          <ul className="menu w-full flex-1 gap-1 p-0">
            <li className="menu-title mb-1">Menu</li>
            {NAV_PLACEHOLDERS.map((label) => (
              <li key={label}>
                {/* TODO: replace with <Link href="/your-route"> when the route exists */}
                <button type="button" className="rounded-xl">
                  {label}
                </button>
              </li>
            ))}
          </ul>


          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="w-10 rounded-full bg-indigo-100 text-indigo-600">
                  <PersonIcon className="h-10 w-10" />
                </div>
              </div>
              <div className="min-w-0">
                {/* TODO: show session user name here */}
                <p className="truncate text-sm font-semibold text-slate-800">
                  {
                    session?.user? <>{session?.user?.name}</> : <>Guest user</>
                  }
                </p>
                <p className="truncate text-xs text-slate-500">{session?.user? <>{session?.user?.email}</> : <>Not signed in</>}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {session?.user ? (
                <>
                  <button
                    onClick={()=>handelSignOut()}
                    type="button"
                    className="btn btn-sm btn-outline btn-error mt-2 w-full"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href={`/sign-in`} className="btn btn-sm btn-outline">
                  
                  <button type="button" >
                    Sign in
                  </button>
                  </Link>

                  <Link href={`/sign-up`} className="btn btn-sm btn-primary">
                  
                  <button type="button" >
                    Sign up
                  </button>
                  </Link>

                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
