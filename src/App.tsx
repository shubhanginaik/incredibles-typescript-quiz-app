import React, { useState } from "react";
import "./App.css";

import { fetchQuizQuestions } from "./API";

import QuestionCard from "./components/QuestionCard";

//type
import { QuestionState, Difficulty } from "./API";
export type AnswerObj = {
  question: string;
  answer: string; //user answer
  correct: boolean; //tell if user answered correctly
  correctAnswer: string;
};
function App() {
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [TOTAL_QUESTIONS, setNoOfQuestions] = useState(0);
  const [number,setNumber] = useState(0);
  const [type, setType] = useState("easy");
  const[score,setscore] =useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY));

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    console.log(newQuestions);
    setLoading(false);
  };
  const questionNumberHandler = (event: React.ChangeEvent) => {
    setNoOfQuestions(+(event.target as HTMLInputElement).value);
  };
  const typeHandler = (event: React.ChangeEvent) => {
    console.log("type reached");
    setType((event.target as HTMLSelectElement).value);
  };
  return (
    <div className="App">
      <h1>QUIZ APP</h1>
      <label>Number of Questions </label>
      <input type="text" onChange={questionNumberHandler} />
      <br></br>
      <br></br>
      <span>
        <p>Please select difficulty level</p>
        <select name="done" defaultValue="easy" onChange={typeHandler}>
          <option value="easy">EASY</option>
          <option value="medium">MEDIUM</option>
          <option value="hard">HARD</option>
        </select>
      </span>
      {!gameOver && <p>Score: </p>}
      {userAnswers.length === TOTAL_QUESTIONS && (
        <p>Game Over. Press Start button to play again</p>
      )}
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <button className="start" onClick={startTrivia}>
          Start
        </button>  
      )}
      
      {loading && <p>Loading Trivias ... </p>}
      {!loading &&
        !gameOver &&
        userAnswers.length !== TOTAL_QUESTIONS &&
        questions.length > 0 && <QuestionCard
        questionNo={number +1}
        totalquestions = {TOTAL_QUESTIONS}
        question ={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number]:undefined}
        callback={questionNumberHandler}

        
        />}
      <br></br>
      <button>Next question</button>
    </div>
  );
}

export default App;
