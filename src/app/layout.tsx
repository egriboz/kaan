import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";
// import localFont from "next/font/local";
import { Lekton } from "next/font/google";
import "./globals.css";

const lekton = Lekton({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Kaan Eğriboz",
  description: "Jr. Eğriboz is a student, student, gamer and artist.",
  verification: {
    google: "MBw_iIeOVo-QqzeZxa9LH0zxsZlaP_O2pDLlMTClCV4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lekton.className} text-black antialiased`}>
      <Head>
        <title>Kaan Eğriboz</title>
        <link rel="stylesheet" href="https://use.typekit.net/zop5ajk.css" />
      </Head>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${lekton.className} text-black antialiased`}
      >
        <main>{children}</main>
      </body>
      <GoogleAnalytics gaId="G-3MHLTPH75P" />
    </html>
  );
}
