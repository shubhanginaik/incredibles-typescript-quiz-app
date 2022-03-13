import React,{useState} from 'react';
import './App.css';

import {fetchQuizQuestions} from './API';

import QuestionCard from './components/QuestionCard';

//type
import { QuestionState, Difficulty } from './API';

const TOTAL_QUESTIONS=10;
function App() {
  const [loading ,setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY));

  const startTrivia = async ()=>{
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    );
      setLoading(false);
  }

  return (
    <div className="App">
  <h1>QUIZ APP</h1>
  <button>Start</button>
  <p className="score">Score:</p>
  <QuestionCard />
  <button>Next question</button>
    </div>
  );
}

export default App;
