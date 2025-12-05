import Footer from "@/lib/components/layout/Footer";
import { Header } from "@/lib/components/layout/Header";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import type { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <QueryProvider>{children}</QueryProvider>
      <Footer />
    </>
  );
}
