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

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const validDIR = ["social", "environment", "governance"];

const Page = ({ params }) => {
  const router = useRouter();
  const [markdown, setMarkdown] = useState();
  const initiativeNameRef = useRef(null);

  // Function to create an initiative
  const createInitiative = async () => {
    const fileContentData = new FileContent({
      sha: "",
      path: `${params.dir}/${_.kebabCase(initiativeNameRef.current.value)}`,
      name: initiativeNameRef.current.value,
      type: "file",
      content: markdown.content || "# Click to start editing",
    });

    router.push("/");

    toast.loading("Creating the document", {
      duration: 5000,
    });
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      ESG.updateFile(updatedContent);
      toast.success(
        "Document Created. Please wait 30 seconds to see the changes"
      );
    } catch (error) {
      toast.error("Failed to create document");
    }
  };

  const handleEditorChange = (value) => {
    setMarkdown((prevMarkdown) => ({
      ...prevMarkdown,
      content: value,
    }));
  };

  if (!validDIR.includes(params.dir)) {
    return <div>This isn't the directory you're looking for.</div>;
  }

  return (
    <div className="">
      <div className="flex justify-between m-3">
        <input
          type="text"
          placeholder="Initiative Name"
          ref={initiativeNameRef}
          className="border-2 p-2 border-black/25 font-bold rounded-lg"
        />
        <div>
          <button
            className="border-2 mx-1 border-black/25 font-bold rounded-lg py-2 px-3 bg-violet-400 hover:bg-violet-500 transition-colors ease-linear"
            onClick={createInitiative}
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
      <div data-color-mode="light">
        <MDEditor
          value="# Click to start editing"
          className="my-1"
          height={700}
          style={{ padding: "1.5rem" }}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default Page;
