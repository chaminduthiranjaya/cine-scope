"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function FloatingAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[60] rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-600/40 w-14 h-14 flex items-center justify-center transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[59] w-full max-w-md">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-600 to-[#be123c] flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-50">
                    CineScope AI
                  </p>
                  <p className="text-xs text-slate-400">
                    Describe a movie or mood, I'll find it.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[480px] overflow-y-auto"></div>
          </div>
        </div>
      )}
    </>
  );
}
