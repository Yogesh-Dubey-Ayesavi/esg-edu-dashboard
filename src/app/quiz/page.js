"use client";

import { useEffect, useState } from "react";
import { Button, ButtonGroup, TextField, Box, Typography, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ESG from "@/lib/esg-helper";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Question from "@/components/Question"; // Update the import path based on your project structure

const Home = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await ESG.supabase.from("question_context").select();
        if (data && data.length > 0) {
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      const makeAsync = async () => {
        const data = await ESG.getUserInfo();
        setUserId(data.id);
      };

      makeAsync();
    } catch (e) {
      toast.error(e);
    }
  }, []);

  useEffect(() => {
    const callFunction = async () => {
      const role = await ESG.getRole();
      if (role === "super_admin") {
        router.push("/dashboard");
        return;
      }

      const { data, error } = await ESG.supabase.rpc("had_assesment");
      if (data === true) {
        router.push("/dashboard");
      } else {
        router.push("/quiz");
      }
    };
    callFunction();
  }, []);

  // const hasMoreThan300Words = (text) => {
  //   const words = text.trim().split(/\s+/);
  //   return words.length >= 300;
  // };

  const handleInputChange = (value) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (userId) {
      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          institution_id: userId,
          que_id: questions[currentQuestionIndex].id,
          question: questions[currentQuestionIndex].question,
          links: questions[currentQuestionIndex].link,
          type: questions[currentQuestionIndex].type,
          answer: currentAnswer,
        },
      ]);
    }
    setCurrentAnswer("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    setUserAnswers((prevAnswers) => prevAnswers.slice(0, -1));
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    setUserAnswers((prevAnswers) => [...prevAnswers, { id: questions[currentQuestionIndex].id, answer: "" }]);
    setCurrentAnswer("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const apiKey = "qWk0Pe6jAO3mxFQCvctoIuO4PdU0IcKQ1ta6m5vhchOd0Z0KdoLWQORKAK8PZeehyfvTdtUY9DHqsMvln9z6XG1SopoqA7d8J4hXhR4zJZv4kkeHm7qNWkN8R0rq8INB";

      const response = await fetch("https://asia-south1-esgedu-740d2.cloudfunctions.net/llm-reporter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // apikey: apiKey,
        },
        body: JSON.stringify({
          data: {
            id: userId,
            qa: userAnswers,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success("Answers submitted successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "60%",
          padding: "3rem",
          border: "1px solid #ddd",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          "@media(max-width: 600px)": {
            width: "90%",
          },
        }}
      >
        {questions.length > 0 && currentQuestionIndex < questions.length && (
          <Question
            question={questions[currentQuestionIndex].question}
            isNumeric={questions[currentQuestionIndex].is_numeric}
            currentAnswer={currentAnswer}
            questions={questions}
            onChange={handleInputChange}
            currentQuestionIndex={currentQuestionIndex}
          />
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack} disabled={currentQuestionIndex === 0} sx={{ backgroundColor: "#6366F1", borderRadius: "10px " }}>
            Back
          </Button> */}
          {questions.length > 0 && currentQuestionIndex < questions.length - 1 ? (
            currentAnswer.trim() === "" ? (
              <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleSkip} sx={{ backgroundColor: "#6366F1", borderRadius: "10px " }}>
                Skip
              </Button>
            ) : (
              <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext} sx={{ backgroundColor: "#6366F1", borderRadius: "10px " }}>
                Next
              </Button>
            )
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => {
                handleSubmit();
              }}
              sx={{ backgroundColor: "#6366F1", borderRadius: "10px " }}
            >
              Submit
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
