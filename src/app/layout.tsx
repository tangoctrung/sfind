import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({ subsets: ["cyrillic"], weight: ["300", "700"] });

export const metadata: Metadata = {
  title: {
    template: '%s | SFind',
    default: 'SFind'
  },
  description: 'SFind - trang web lưu trữ, tìm kiếm file tốt nhất, đơn giản nhất',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    siteName: 'SFind Company'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={ubuntu.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
