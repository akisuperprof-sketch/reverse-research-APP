import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "IntentOS | 検索意図から売れるマイクロアプリを量産するAI OS",
  description: "検索キーワードからMVP仕様書、SEO LP、YouTube構成、ローンチ計画を1画面で生成",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full font-sans bg-[#F9FAFB] text-[#111827]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
