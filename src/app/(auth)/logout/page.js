"use client";
import ESG from "@/lib/esg-helper";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  ESG.signOut();
  router.push("/hello");

  return;
};

export default page;
