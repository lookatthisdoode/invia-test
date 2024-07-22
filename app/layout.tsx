import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { jakarta } from "@/app/lib/fonts";

export const metadata: Metadata = {
  title: "Vacation Engineer",
  description: "Application to search and book your vacation stay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${jakarta.className} flex flex-col min-h-screen items-center`}
      >
        {children}
      </body>
    </html>
  );
}
