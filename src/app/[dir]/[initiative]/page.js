"use client";

import React, { useLayoutEffect, useState } from "react";
import { FileContent } from "esg-sdk";
import ESG from "@/lib/esg-helper";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import _ from "lodash";
import CommentSection from "@/components/comments/CommentSection";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const validDIR = ["social", "environment", "governance"];

const DUMMY_COMMENTS = [{id: 1, content: "comment1"}, {id: 2, content: "comment2"}, {id: 3, content: "comment3"}]

const page = ({ params }) => {
  if (!validDIR.includes(params.dir)) {
    return <div>This isnt the directory youre looking for.</div>;
  }

  const [markdown, setMarkdown] = useState(" ### Please Wait...");
  const router = useRouter();
  const handleEditorChange = (value) => {
    setMarkdown((prevMarkdown) => ({
      ...prevMarkdown,
      content: value,
    }));
  };

  const handleUpdate = async () => {
    const updatedContent = new FileContent({ ...markdown });
    router.push("/dashboard");
    toast.loading('Updating the document', {
      duration: 5000})
    try{
      await new Promise((resolve) => setTimeout(resolve, 5000));
      ESG.updateFile(updatedContent)
      toast.success("Updated. Please wait 30 seconds to see the changes");
    }
    catch(error){
      toast.error("Failed to update document");
    }
  };

  const handleDelete = async () => {
    const updatedContent = new FileContent({ ...markdown });
    router.push("/");
    toast.loading('Deleting the document', {
      duration: 5000})
    try{
      await new Promise((resolve) => setTimeout(resolve, 5000));
      ESG.updateFile(updatedContent)
      toast.success("Deleted. Please wait 30 seconds to see the changes");
    }
    catch(error){
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
        <h1 className="text-3xl font-bold text-center">
          {_.startCase(params.initiative)}
        </h1>
        <div>
          <button
            className="border-2 mx-1 border-black/25 font-bold rounded-lg py-2 px-3 bg-violet-400 hover:bg-violet-500 transition-colors ease-linear"
            onClick={handleUpdate}
          >
            Submit
          </button>
          <button
            className="border-2 mx-1 border-black/25 font-bold rounded-lg py-2 px-3 bg-violet-400 hover:bg-violet-500 transition-colors ease-linear"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="border-2 mx-1 border-black/25 font-bold rounded-lg py-2 px-3 bg-violet-400 hover:bg-violet-500 transition-colors ease-linear"
            onClick={router.back}
          >
            Go Back
          </button>
        </div>
      </div>
      <div data-color-mode="light">
        <MDEditor
          value={markdown.content}
          className="my-1"
          height={700}
          style={{ padding: "1.5rem" }}
          onChange={handleEditorChange}
        />
        <CommentSection comments={DUMMY_COMMENTS}/>
      </div>
    </div>
  );
};

export default page;
