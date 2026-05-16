import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full font-sans bg-[#F9FAFB] text-[#111827]">
        {children}
      </body>
    </html>
  );
}
