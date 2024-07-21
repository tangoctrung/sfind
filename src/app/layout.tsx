import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import 'react-medium-image-zoom/dist/styles.css'
import { StoreProvider } from "./StoreProvider";
import { AppMain } from "./AppMain";

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
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
          {/* <!-- Google tag (gtag.js) --> */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_TRACKING_GA}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_TRACKING_GA}');
              `
            }}
          />

        </head>
        <body className={ubuntu.className} suppressHydrationWarning={true}>
          <AppMain>
            {children}
          </AppMain>
          <SpeedInsights />
        </body>
      </html>
    </StoreProvider>
  );
}
