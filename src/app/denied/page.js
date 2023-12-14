import Link from "next/link";
import { Button } from "@mui/material";

const AccessDenied = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="text-7xl font-bold my-7">Access Denied</h1>
      <p className="text-2xl">You do not have the premission to access this page.</p>
      <p className="text-2xl">Please contact the site Administrator(s) to request access.</p>
      <Link href="/login">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#6366F1",
            padding: "8px 20px",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "600",
            marginTop: "16px",
          }}
        >
          Back to Login
        </Button>
      </Link>
    </div>
  );
};

export default AccessDenied;
