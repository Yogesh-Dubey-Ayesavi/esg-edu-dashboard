"use client";

import React, { useEffect, useState } from "react";
import { FileContent } from "esg-sdk";
import ESG from "@/lib/esg-helper";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, OutlinedInput, Paper, SvgIcon } from "@mui/material";
import _ from "lodash";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PublishIcon from "@mui/icons-material/Publish";
import DeleteIcon from "@mui/icons-material/Delete";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const validDIR = ["social", "environment", "governance"];

const page = ({ params }) => {
  if (!validDIR.includes(params.dir)) {
    return <div>This isnt the directory youre looking for.</div>;
  }

  const [markdown, setMarkdown] = useState(" ### Please Wait...");
  const [initiativeName, setInitiativeName] = useState(_.startCase(params.initiative));
  const router = useRouter();
  const handleEditorChange = (value) => {
    setMarkdown((prevMarkdown) => ({
      ...prevMarkdown,
      content: value,
    }));
  };

  const handleUpdate = async () => {
    const updatedContent = new FileContent({
      ...markdown,
      name: initiativeName,
    });

    toast.loading("Updating the document", {
      duration: 5000,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      ESG.updateFile(updatedContent);
      toast.success("Updated. Please wait 30 seconds to see the changes");
    } catch (error) {
      toast.error("Failed to update document");
    }

    router.back();
  };

  const handleDelete = async () => {
    const updatedContent = new FileContent({ ...markdown });
    toast.loading("Deleting the document", {
      duration: 5000,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await ESG.deleteFile(updatedContent);
      router.back();
      toast.success("Deleted. Please wait 30 seconds to see the changes");
    } catch (error) {
      toast.error("Failed to delete document");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await ESG.getFileContent(params.dir, params.initiative);
      setMarkdown(data);
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <div className="flex justify-between mb-5 ">
        <div>
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
              defaultValue=""
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
              onChange={(e) => setInitiativeName(e.value)}
            />
          </Paper>
        </div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
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
            startIcon={<PublishIcon />}
            onClick={handleUpdate}
          >
            Publish
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
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
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
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </div>
      </div>
      <div data-color-mode="light">
        <MDEditor value={markdown.content} className="my-1" height={750} style={{ padding: "1.5rem" }} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default page;
