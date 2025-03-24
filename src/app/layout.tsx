import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "問い合わせフォーム",
  description: "Next.jsで作成した問い合わせフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}