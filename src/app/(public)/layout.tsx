import Footer from "@/lib/components/layout/Footer";
import { Header } from "@/lib/components/layout/Header";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
