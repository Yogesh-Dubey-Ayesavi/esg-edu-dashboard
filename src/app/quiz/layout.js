"use client";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import WithAuth from "@/components/WithAuth";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className={inter.className}>
      <div className="mt-[70px]">
        <WithAuth>{children}</WithAuth>
        <Toaster />
      </div>
    </div>
  );
}
