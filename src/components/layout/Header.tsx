"use client";
import clsx from "clsx";
import { Film } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Page = "home" | "explore" | "pricing" | "about";

export function Header() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const router = useRouter();
  return (
    <header className="sticky top-0 h-20 w-full z-50 bg-[#0f0f12]/80 backdrop-blur-xl border-b border-[#334155]/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage("home")}
            className="hover:cursor-pointer flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center shadow-lg shadow-[#e11d48]/20">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-impact">CineScope</span>
          </button>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage("explore")}
              className={clsx(
                "transition-colors duration-200",
                currentPage === "explore"
                  ? "text-white hover:cursor-default"
                  : "text-[#94a3b8] hover:text-white hover:cursor-pointer"
              )}
            >
              Explore
            </button>
            <button
              onClick={() => setCurrentPage("pricing")}
              className={clsx(
                "transition-colors duration-200",
                currentPage === "pricing"
                  ? "text-white hover:cursor-default"
                  : "text-[#94a3b8] hover:text-white hover:cursor-pointer"
              )}
            >
              Pricing
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className={clsx(
                "transition-colors duration-200",
                currentPage === "about"
                  ? "text-white hover:cursor-default"
                  : "text-[#94a3b8] hover:text-white hover:cursor-pointer"
              )}
            >
              About
            </button>
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="hover:cursor-pointer hidden sm:block px-5 py-2.5 text-[#94a3b8] hover:text-white transition-colors duration-200"
            >
              Sign In
            </button>
            <button className="hover:cursor-pointer px-6 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-lg transition-all duration-200 shadow-lg shadow-[#e11d48]/20 hover:shadow-xl hover:shadow-[#e11d48]/30">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
