import { authOptions } from "@/lib/auth/options";
import Footer from "@/lib/components/layout/Footer";
import { Header } from "@/lib/components/layout/Header";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Header />
      <QueryProvider>{children}</QueryProvider>
      <Footer />
    </>
  );
}
