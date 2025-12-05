"use client";
import { useAppSelector } from "@/store/hooks";
import clsx from "clsx";
import { Film } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const watchlistCount = useAppSelector(
    (state) => Object.keys(state.watchList.items).length
  );

  function handleAuthClick() {
    if (isAuthenticated) {
      signOut({ callbackUrl: "/" });
    } else {
      router.push("/login");
    }
  }

  return (
    <header className="sticky top-0 h-20 w-full z-50 bg-gray-950/80 backdrop-blur-xl border-b border-slate-700/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => {
              router.push("/");
            }}
            className="hover:cursor-pointer flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 bg-rose-700 flex items-center justify-center shadow-lg shadow-rose-600/20">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-impact">CineScope</span>
          </button>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/explore"
              className={clsx("transition-colors duration-200", {
                "text-white hover:cursor-default": pathname === "/explore",
                "text-slate-400 hover:text-white hover:cursor-pointer":
                  pathname !== "/explore",
              })}
            >
              Explore
            </Link>
            <Link
              href="/pricing"
              className={clsx("transition-colors duration-200", {
                "text-white hover:cursor-default": pathname === "/pricing",
                "text-slate-400 hover:text-white hover:cursor-pointer":
                  pathname !== "/pricing",
              })}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={clsx("transition-colors duration-200", {
                "text-white hover:cursor-default": pathname === "/about",
                "text-slate-400 hover:text-white hover:cursor-pointer":
                  pathname !== "/about",
              })}
            >
              Docs
            </Link>
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAuthClick}
              className={clsx(
                "hover:cursor-pointer hidden sm:block px-5 py-2.5 text-slate-400 hover:text-white transition-colors duration-200",
                {
                  "hover:cursor-pointer px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-all duration-200 shadow-lg shadow-rose-600/20 hover:shadow-xl hover:shadow-rose-600/30":
                    isAuthenticated,
                }
              )}
            >
              {isAuthenticated ? "Sign Out" : "Sign In"}
            </button>
            {isAuthenticated && watchlistCount > 0 && (
              <Link
                href="/watchlist"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/70 border border-slate-700/60 text-xs text-slate-200 hover:border-rose-600 transition-colors"
              >
                <span>Watchlist ({watchlistCount})</span>
              </Link>
            )}
            {!isAuthenticated && (
              <Link
                href="/login"
                className="hover:cursor-pointer px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-all duration-200 shadow-lg shadow-rose-600/20 hover:shadow-xl hover:shadow-rose-600/30"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
