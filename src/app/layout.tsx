import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "reverse research",
  description: "検索意図から売れるマイクロアプリを逆算するAI OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased overflow-hidden">
      <body className="h-full overflow-hidden font-sans bg-[#F8FAFC] text-[#0F172A]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
