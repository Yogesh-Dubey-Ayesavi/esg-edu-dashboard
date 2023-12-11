"use client";

import React, { useLayoutEffect, useState } from "react";
import { EsgSDK, FileContent } from "esg-sdk";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const ESG = EsgSDK.initialize();

const page = ({ params }) => {
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
    ESG.updateFile(updatedContent);
    toast.success("File Updated");
    router.push("/");
  };

  useLayoutEffect(() => {
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
          {params.initiative.replace("_", " ")}
        </h1>
        <button
          className="border-2 border-black rounded-lg p-2 hover:bg-gray-500"
          onClick={handleUpdate}
        >
          Submit
        </button>
      </div>
      <MDEditor
        value={markdown.content}
        className="my-1"
        height={825}
        style={{ padding: "1.5rem" }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default page;
