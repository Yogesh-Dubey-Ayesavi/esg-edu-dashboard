import React from "react";

const Comment = ({ content }) => {
  return (
    <div className="bg-[#1C2536]/25 p-2 mb-2 rounded-md">
      <b>Anonymous:</b> {content}
    </div>
  );
};

export default Comment;
