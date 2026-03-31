"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Provider } from "@/src/components/ui/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
