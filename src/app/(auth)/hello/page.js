"use client";

import { Alert, Box, Button, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Google from "../../../lottie/google.json";
import Lottie from "lottie-react";
// import { useAuth } from "src/hooks/use-auth";

import ESG from "@/lib/esg-helper";

const Page = () => {
  const router = useRouter();
  //   const auth = useAuth();
  const [method, setMethod] = useState("email");
  //   const formik = useFormik({
  //     initialValues: {
  //       email: "demo@devias.io",
  //       password: "Password123!",
  //       submit: null,
  //     },
  //     validationSchema: Yup.object({
  //       email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
  //       password: Yup.string().max(255).required("Password is required"),
  //     }),
  //     onSubmit: async (values, helpers) => {
  //       try {
  //         await auth.signIn(values.email, values.password);
  //         router.push("/");
  //       } catch (err) {
  //         helpers.setStatus({ success: false });
  //         helpers.setErrors({ submit: err.message });
  //         helpers.setSubmitting(false);
  //       }
  //     },
  //   });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    // auth.skip();
    router.push("/");
    //   }, [auth, router]);
  }, [router]);

  const handleClick = () => {
    ESG.signIn((a, b) => {})
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Login
              </Typography>
              <Typography color="grey" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link component={NextLink} href="/auth/register" underline="hover" variant="subtitle2">
                  Register
                </Link>
              </Typography>
            </Stack>
            <Lottie animationData={Google} style={{ height: "200px", margin: "30px 0px" }} />
            <button
              className="flex justify-center items-center w-full font-bold rounded-lg py-2 px-8   transition-colors ease-linear text-white border-0"
              style={{ backgroundColor: "#6366F1", transition: "background-color 0.3s ease" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7C83F4")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#6366F1")}
              onClick={handleClick}
            >
              <FaGoogle className="mr-2" />
              Sign In with Google
            </button>
            <Button fullWidth size="large" sx={{ mt: 3 }} onClick={handleSkip}>
              Skip authentication
            </Button>
            {/* <Alert color="primary" severity="info" sx={{ mt: 3 }}>
              <div>
                You can use <b>demo@devias.io</b> and password <b>Password123!</b>
              </div>
            </Alert> */}
            {/* {method === "phoneNumber" && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">To prevent unnecessary costs we disabled this feature in the demo.</Typography>
              </div>
            )} */}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Page;
