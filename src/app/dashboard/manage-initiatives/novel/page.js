"use client";
import React, { useState } from "react";
import { Editor } from "novel";

const page = () => {
  const [initiatives, setInitiatives] = useState("# this is an example");

  const handleSubmit = () => {
    console.log(initiatives.contentComponent.editorContentRef.current.innerHTML);
  }

  return (
    <div className="flex flex-col">
      <Editor defaultValue={initiatives} onUpdate={setInitiatives} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default page;
