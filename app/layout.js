'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "@/components/logo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-center items-center flex-col">
        <Logo />
        {children}
        </div>
        </body>
    </html>
  );
}
