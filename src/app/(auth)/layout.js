import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../global.css";
import WithAuth from "@/components/WithAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ESG-Edu",
  description: "Smart India Hackathon 2023",
};

export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>
      <WithAuth>{children}</WithAuth>
      <Toaster />
    </div>
  );
}
