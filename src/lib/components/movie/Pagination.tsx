"use client";

import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  type PageItem = number | "...";

  function getPaginationItems(
    currentPage: number,
    totalPages: number
  ): PageItem[] {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const WINDOW_SIZE = 4;
    const startPage = Math.max(2, currentPage - WINDOW_SIZE);
    const endPage = Math.min(
      totalPages - 1,
      currentPage < 6 ? 10 : currentPage + WINDOW_SIZE
    );

    const items: PageItem[] = [
      1,
      ...(startPage > 2 ? ["..." as const] : []),
      ...Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ),
      ...(endPage < totalPages - 1 ? ["..." as const] : []),
      ...(totalPages > 1 ? [totalPages] : []),
    ];

    return items;
  }

  const pages = getPaginationItems(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-3 mt-10">
      {pages.map((item, idx) =>
        item === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-3 text-slate-400">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={`/explore?page=${item}`}
            className={`px-4 py-2 rounded-lg border transition ${
              item === currentPage
                ? "bg-rose-600 text-white border-rose-600"
                : "border-slate-700 text-white hover:border-rose-600 hover:text-rose-400"
            }`}
          >
            {item}
          </Link>
        )
      )}
    </div>
  );
}
