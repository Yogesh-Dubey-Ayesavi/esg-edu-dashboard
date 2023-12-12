import { Inter } from "next/font/google";
import "../global.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ESG-Edu",
  description: "Smart India Hackathon 2023",
};

export default function RootLayout({ children }) {
  return (
      <div className={inter.className}>
        <Sidebar>{children}</Sidebar>
        <Toaster />
      </div>
  );
}
