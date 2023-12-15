"use client";
import ESG from "@/lib/esg-helper";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const page = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    const handleSignOut = async () => {
      await ESG.signOut();
      router.push("/login");
    };

    handleSignOut();
  });

  return <h1 className="text-3xl font-bold text-center">Logging Out</h1>;
};

export default page;
