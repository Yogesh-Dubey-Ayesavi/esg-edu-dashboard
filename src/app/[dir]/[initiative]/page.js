"use client";

import React, { useEffect, useState } from "react";
import { FileContent, InitiativeContent } from "esg-sdk";
import ESG from "@/lib/esg-helper";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Typography } from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();

  const fileModel = JSON.parse(search.get("data"));

  const handleEditorChange = (value) => {
    setMarkdown((prevMarkdown) => ({
      ...prevMarkdown,
      content: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    const updatedContent = new InitiativeContent({
      ...markdown,
      name: initiativeName,
    });

    toast.loading("Updating the document", {
      duration: 5000,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      ESG.updateFile(fileModel, updatedContent);
      toast.success("Updated. Please wait 30 seconds to see the changes");
    } catch (error) {
      toast.error("Failed to update document");
    }
    setLoading(false);
    router.back();
  };

  const handleDelete = async () => {
    setLoading(true);
    const updatedContent = new InitiativeContent({ ...markdown });
    toast.loading("Deleting the document", {
      duration: 5000,
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await ESG.supabase.rpc("delete_file", {
        file_id: fileModel.id,
        path: fileModel.path + ".mdx",
        file_sha: markdown.sha,
      });
      router.back();
      toast.success("Deleted. Please wait 30 seconds to see the changes");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete document");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await ESG.getInitiativeContent(params.dir, params.initiative);
      // console.log(data);
      setMarkdown(data);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between mb-5 ">
        <div>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              "@media (maxWidth:600px)": {
                fontSize: "0.5rem",
              },
              marginBottom: "1em",
            }}
          >
            {fileModel.name}
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <Button
            variant="text"
            style={{
              color: loading ? "grey" : "black",
              padding: "8px 20px",
              marginLeft: "5px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
            }}
            startIcon={<PublishIcon />}
            onClick={handleUpdate}
            disabled={loading}
          >
            Publish
          </Button>
          <Button
            variant="text"
            style={{
              color: loading ? "grey" : "black",
              padding: "8px 20px",
              marginLeft: "5px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
            }}
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={loading}
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
