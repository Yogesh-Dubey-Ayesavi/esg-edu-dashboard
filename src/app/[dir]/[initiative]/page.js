"use client";

import React, { useLayoutEffect, useState } from "react";
import { EsgSDK, FileContent } from "esg-sdk";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import _ from "lodash";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const ESG = EsgSDK.initialize();

const validDIR = ['social', 'environment', 'governance']

const page = ({ params }) => {

  if(!validDIR.includes(params.dir)){
    return <div>This isnt the directory youre looking for.</div>
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
    ESG.updateFile(updatedContent);
    toast.success("File Updated");
    router.push("/");
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
            onClick={router.back}
          >
            Go Back
          </button>
        </div>
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
