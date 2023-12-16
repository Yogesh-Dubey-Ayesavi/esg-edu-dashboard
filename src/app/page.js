"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   home page <Link href="/dashboard">Dashboard </Link>
    // </main>
    <h1>wait</h1>
  );
}
