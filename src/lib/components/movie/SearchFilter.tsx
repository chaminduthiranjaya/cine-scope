"use client";
import { useDebounce } from "@/views/hooks/useDebounce";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  initialValue: string;
  onSearchChange: (value: string) => void;
};

export default function SearchFilter({ initialValue, onSearchChange }: Props) {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const debounced = useDebounce(searchQuery, 400);

  useEffect(() => {
    onSearchChange(debounced);
  }, [debounced]);

  return (
    <div className="mb-12">
      <div className="relative ">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#94a3b8]" />
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-16 pr-6 py-5 bg-[#1e293b] border-2 border-[#334155] rounded-2xl focus:outline-none focus:border-[#e11d48] transition-colors text-white text-lg"
        />
      </div>
    </div>
  );
}
