import React, { useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  useEffect(() => { 
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  }, [])
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE"
    })
    .then(resp => resp.json())
    .then((data)=>{
      const updatedQuestion = questions.filter(question => question.id !== id) 
      setQuestions(updatedQuestion)
    })
  }
  const handleAnswerChange = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({correctIndex})
    })
    .then(resp => resp.json())
    .then(data => {
      const updatedQuestion = questions.map(question => {
        if (question.id === data.id){
          return data
        } 
        return question
      })
      setQuestions(updatedQuestion)
    })
  }
  const questionItem = questions.map(question => (
    <QuestionItem 
    key = {question.id}
    question = {question}
    onDeleteClick = {handleDelete}
    onAnswerChange = {handleAnswerChange}
    />
  ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItem}</ul>
    </section>
  );
}

export default QuestionList; 
