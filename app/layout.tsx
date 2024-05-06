import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/app/(loadDocument)/components/Header";
import Footer from "@/app/(loadDocument)/components/Footer";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Informarker",
  description: "Website against foreign agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-[100vh]" lang="en" data-theme="light">
      <body className={clsx(inter.className, "h-[100vh] flex flex-col")}>
        <Header />
        <div className="flex-1 container mx-auto">
            {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
