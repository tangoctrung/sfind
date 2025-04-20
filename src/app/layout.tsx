import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import { GoogleOAuthProvider } from "@react-oauth/google"

const openSans = Open_Sans({ subsets: ["cyrillic"], weight: ["300", "800"] });

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
        <body className={openSans.className} suppressHydrationWarning={true}>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
            {children}
          </GoogleOAuthProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
