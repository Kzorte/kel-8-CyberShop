'use client'
import React from 'react';
import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import { AuthProvider } from '@/context/AuthContext';

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  hideHeader = false,
  hideFooter = false,
}: {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={poppins.className}>
          {!hideHeader && <SiteHeader />}
          <main className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            {children}
          </main>
          <CommonClient />
          {!hideFooter && <Footer />}
        </body>
      </html>
    </AuthProvider>
  );
}
