import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import ESG from "@/lib/esg-helper";

const QuestionPage = ({ type }) => {
  const [questions, setQuestions] = useState([]);
  const [editQuestion, setEditQuestion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchData = async () => {
    try {
      const { data, error } = await ESG.supabase.from("question_context").select().eq("type", type);

      console.log(data);
      if (data && data.length > 0) {
        setQuestions(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveQuestion = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
  };

  const handleEditClick = (question) => {
    setEditQuestion(question);
    setOpenDialog(true);
  };

  const handleEditDialogClose = () => {
    setEditQuestion(null);
    setOpenDialog(false);
  };

  const handleEditSave = () => {
    // Implement logic to save the edited question
    // You can make an API call or update the state directly
    // For simplicity, let's just update the state
    setQuestions((prevQuestions) => prevQuestions.map((question) => (question.id === editQuestion.id ? { ...question, ...editQuestion } : question)));
    setOpenDialog(false);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {questions.map((question) => (
        <Box key={question.id} sx={{ border: "1px solid #ddd", borderRadius: "10px", marginBottom: "1rem", padding: "1rem" }}>
          <Typography variant="h6">Q. {question.question}</Typography>
          <Typography>Desc: {question.description}</Typography>
          <Typography>Context: {question.context}</Typography>
          <Button variant="outlined" color="info" onClick={() => handleEditClick(question)} sx={{ marginRight: "0.5rem", marginTop: "1rem" }}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleRemoveQuestion(question.id)} sx={{ marginTop: "1rem" }}>
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
