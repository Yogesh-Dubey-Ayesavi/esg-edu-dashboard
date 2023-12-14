"use client";
import Link from "next/link";
import ESG from "@/lib/esg-helper";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  // ESG.getUserInfo().then((auth) => console.log(auth));
  console.log('called getuserinfo')
  const isLoggedIn = false;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      home page <Link href="/dashboard">Dashboard </Link>
    </main>
  );
}
