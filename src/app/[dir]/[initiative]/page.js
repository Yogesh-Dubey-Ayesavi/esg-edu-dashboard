"use client";

import React, { useEffect, useState } from "react";
import { FileContent } from "esg-sdk";
import ESG from "@/lib/esg-helper";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import _ from "lodash";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    // const updatedContent = new FileContent({
    //   ...markdown,
    //   name: initiativeName,
    // });

    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 5000));
    //   ESG.updateFile(updatedContent);
    //   toast.success("Updated. Please wait 30 seconds to see the changes");
    // } catch (error) {
    //   toast.error("Failed to update document");
    // }

    router.back();
    // toast.loading("Updating the document", {
    //   duration: 5000,
    //   position: "top-right",
    // });
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
      <div className="flex justify-between m-3">
        <div>
          <label htmlFor="initiativeName">Name of Initiative</label>
          <input type="text" placeholder="Initiative Name" value={initiativeName} className="border-2 p-2 border-black/25 font-bold rounded-lg mx-3" onChange={(e) => setInitiativeName(e.value)} />
        </div>
        <div>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#6366F1",
              padding: "8px 20px",
              margin: "0 5px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
              marginTop: "16px",
              color: "white",
            }}
            onClick={handleUpdate}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#6366F1",
              padding: "8px 20px",
              margin: "0 5px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
              marginTop: "16px",
              color: "white",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#6366F1",
              padding: "8px 20px",
              margin: "0 5px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
              marginTop: "16px",
              color: "white",
            }}
            startIcon={<ArrowBackIcon />}
            onClick={handleUpdate}
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
