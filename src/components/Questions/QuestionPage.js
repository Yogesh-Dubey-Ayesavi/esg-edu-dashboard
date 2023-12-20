import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import ESG from "@/lib/esg-helper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";

const QuestionPage = ({ type }) => {
  const [questions, setQuestions] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [reRender, setReRender] = useState(false);

  const fetchData = async () => {
    try {
      const { data, error } = await ESG.supabase.from("question_context").select().eq("type", type);

      //   console.log(data);
      if (data && data.length > 0) {
        setQuestions(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reRender]);

  const handleRemoveQuestion = async (id) => {
    // setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    try {
      const { error } = await ESG.supabase.from("question_context").delete().eq("id", id);
      toast.success("Question has been deleted successfully.");
      setReRender((prev) => !prev);
    } catch (e) {
      toast.error(e);
    }
  };

  const handleEditClick = (question) => {
    setEditQuestion(question);
    setOpenDialog(true);
  };

  const handleEditDialogClose = () => {
    setEditQuestion(null);
    setOpenDialog(false);
  };

  const handleEditSave = async () => {
    // setQuestions((prevQuestions) => prevQuestions.map((question) => (question.id === editQuestion.id ? { ...question, ...editQuestion } : question)));
    // console.log(editQuestion);
    try {
      const { error } = await ESG.supabase.from("question_context").update(editQuestion).eq("id", editQuestion.id);
      toast.success("Question has been edited successfully.");
      setReRender((prev) => !prev);
    } catch (e) {
      toast.error(e);
    }

    setOpenDialog(false);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {questions.map((question) => (
        <Box key={question.id} sx={{ border: "1px solid #ddd", borderRadius: "10px", marginBottom: "1rem", padding: "1rem" }}>
          <Typography variant="h6">Q. {question.question}</Typography>
          <Typography>Description : {question.description}</Typography>
          <Typography>Context : {question.context}</Typography>
          <Button variant="text" startIcon={<EditIcon />} onClick={() => handleEditClick(question)} sx={{ color: "black", marginRight: "0.5rem", marginTop: "1rem", fontWeight: "bold" }}>
            Edit
          </Button>
          <Button variant="text" startIcon={<DeleteIcon />} onClick={() => handleRemoveQuestion(question.id)} sx={{ color: "red !important", marginTop: "1rem", fontWeight: "bold" }}>
            Remove
          </Button>
        </Box>
      ))}

      {/* Edit Question Dialog */}
      <Dialog open={openDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <DialogContentText>Modify the question details:</DialogContentText>
          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editQuestion?.question || ""}
            onChange={(e) => setEditQuestion((prev) => ({ ...prev, question: e.target.value }))}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editQuestion?.description || ""}
            onChange={(e) => setEditQuestion((prev) => ({ ...prev, description: e.target.value }))}
          />
          <TextField
            label="Context"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editQuestion?.context || ""}
            onChange={(e) => setEditQuestion((prev) => ({ ...prev, context: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary" variant="text">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuestionPage;
