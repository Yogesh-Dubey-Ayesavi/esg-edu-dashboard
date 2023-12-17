"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import loggedIn from "@/lib/is-logged-in";

const WithAuth = ({ children }) => {
  const router = useRouter();
  useLayoutEffect(() => {
    const checkUser = async () => {
      const logged_in = await loggedIn();
      if (logged_in) {
        console.log("User Logged In");
      } else {
        return router.push("/login");
      }
    };

    checkUser();
  }, []);

  return <>{children}</>;
};

export default WithAuth;
