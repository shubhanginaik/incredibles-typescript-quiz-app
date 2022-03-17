import React, { useState } from "react";
import "./App.css";

import { fetchQuizQuestions } from "./API";

import QuestionCard from "./components/QuestionCard";

import { GlobalStyle, Wrapper } from './App.style';
//type
import { QuestionState, Difficulty } from "./API";
export type AnswerObj = {
  question: string;
  answer: string; //user answer
  correct: boolean; //tell if user answered correctly
  correctAnswer: string;
};
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [TOTAL_QUESTIONS, setNoOfQuestions] = useState(0);
  const [number, setNumber] = useState(0);
  const [type, setType] = useState("easy");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY));

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    console.log(type);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, type);
    console.log(newQuestions);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const AnswerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, AnswerObj]);
    }
  };

  const nextQuestion = () => {
    // if not the last question move to the next one
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  const questionNumberHandler = (event: React.ChangeEvent) => {
    event.preventDefault();
    setNoOfQuestions(+(event.target as HTMLInputElement).value);
  };
  const typeHandler = (event: React.ChangeEvent) => {
    console.log("type reached");
    setType((event.target as HTMLSelectElement).value);
  };
  return (
    
    <div className="App">
      <GlobalStyle />
      <Wrapper>
      <h1>QUIZ APP</h1>

      {!gameOver && <p>Score: {score} </p>}
      {userAnswers.length === TOTAL_QUESTIONS && (
        <p></p>
      )}
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <div className="opening">
          <label>Number of Questions </label>
          <input
            type="text"
            id="noOfQuestions"
            onChange={questionNumberHandler}
          />
         
          <span>
            <p>Please select difficulty level</p>
            <select name="done" defaultValue="easy" onChange={typeHandler}>
              <option value="easy">EASY</option>
              <option value="medium">MEDIUM</option>
              <option value="hard">HARD</option>
            </select>
          </span>
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        </div>
      )}

      {loading && (
        <div>
          <div className="loader-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {!loading &&
        !gameOver &&
        userAnswers.length !== TOTAL_QUESTIONS &&
        questions.length > 0 && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
      <br></br>


      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
        </Wrapper>

    </div>
  );
};

export default App;
