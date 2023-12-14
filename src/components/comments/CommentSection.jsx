import React, { useState } from "react";
import Comment from "./Comment";
import { Button } from "@mui/material";

const CommentSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    console.log("New Comment:", newComment);

    setNewComment("");
  };

  return (
    <div className="space-y-4 my-6">
      <h1 className="text-2xl font-bold">Comments</h1>
      
      <div className="mb-4 flex items-center justify-between">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-[90%] p-2 border rounded-md"
        />
        <Button
        variant="contained"
        style={{
          backgroundColor: "#6366F1",
          padding: "8px 20px",
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: "600",
        }}
      >
          Add Comment
        </Button>
      </div>

      {comments.map((comment) => (
        <Comment key={comment.id} content={comment.content} />
      ))}
    </div>
  );
};

export default CommentSection;
