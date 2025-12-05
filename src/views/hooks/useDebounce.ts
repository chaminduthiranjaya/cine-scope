"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns - Debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}