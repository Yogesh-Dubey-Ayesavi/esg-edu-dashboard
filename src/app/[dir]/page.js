"use client";

import React, { useState, useRef } from "react";
import { FileContent } from "esg-sdk";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import _ from "lodash";
import ESG from "@/lib/esg-helper";
import { Button, OutlinedInput, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PublishIcon from "@mui/icons-material/Publish";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const validDIR = ["social", "environment", "governance"];

const Page = ({ params }) => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState("# Start Editing ");
  const [initiativeName, setInitiativeName] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to create an initiative
  const createInitiative = async () => {
    setLoading(true);

    if (initiativeName === "") {
      toast.error("Initiative name cannot be empty.");
      setLoading(false);
      return;
    }

    const fileContentData = new FileContent({
      sha: "",
      path: `${params.dir}/${_.kebabCase(initiativeName)}`,
      name: initiativeName,
      type: "file",
      content: markdown.content || "# Click to start editing",
    });

    toast.loading("Creating document", {
      duration: 5000,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      ESG.createFile(fileContentData);
      setLoading(false);
      router.push("/dashboard/manage-initiatives");
      toast.success("Document Created. Please wait 30 seconds to see the changes");
    } catch (error) {
      toast.error("Failed to create document");
    }

    setLoading(false);
  };

  const handleEditorChange = (value) => {
    setMarkdown(value);
  };

  if (!validDIR.includes(params.dir)) {
    return <div>This isn't the directory you're looking for.</div>;
  }

  return (
    <div className="">
      <div className="flex justify-between mb-5">
        <Paper
          sx={{
            width: "400px",
            borderRadius: "11px",
            "@media (maxWidth: 600px)": {
              width: "100%",
            },
          }}
        >
          <OutlinedInput
            fullWidth
            placeholder={"Enter Initiative"}
            sx={{
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "3px solid #6366f1",
                  transition: "0.3s ease-in-out",
                },
              },
              "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "3px solid #6366f1",
                  transition: "0.3s ease-in-out",
                },
              },
              borderRadius: "10px",
            }}
            value={initiativeName}
            onChange={(e) => {
              setInitiativeName(e.target.value);
            }}
          />
        </Paper>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <Button
            variant="text"
            style={{
              color: loading ? "grey": "black",
              padding: "8px 20px",
              marginLeft: "5px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
            }}
            onClick={createInitiative}
            startIcon={<PublishIcon />}
            disabled={loading}
          >
            Create
          </Button>

          <Button
            variant="text"
            style={{
              color: "black",
              padding: "8px 20px",
              marginLeft: "5px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
            }}
            startIcon={<ArrowBackIcon />}
            onClick={router.back}
          >
            Back
          </Button>
        </div>
      </div>
      <div data-color-mode="light">
        <MDEditor value={markdown} className="my-1" height={750} style={{ padding: "1.5rem" }} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default Page;
