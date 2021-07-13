import React, { useState } from 'react';
import { fetchQuizQuestions } from './Config/API';

import QuestionCard from './components/QuestionCard/QuestionCard';

import { QuestionsState, Difficulty } from './Config/API';

import { GlobalStyle, Wrapper } from './App.styles';
import PersonIcon from '@material-ui/icons/Person';
import logo1 from "./images/logo1.png"
import {Link,useNavigate} from "react-router-dom";
import { Button } from '@material-ui/core';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      
      const answer = e.currentTarget.value;
      
      const correct = questions[number].correct_answer === answer;
      
      if (correct) setScore((prev) => prev + 1);
      
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
 
  let navigate=useNavigate();
  return (
    <>
      <GlobalStyle />
      <Wrapper>

      <div className="nav">
            
            <div>
              <Link to="/home">
                <img style={{width:"4rem"}} src={logo1} alt="" />
              </Link>
            </div>
            <div>
                <h2>Nginx Quiz</h2>
            </div>
            <div>
            <Button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            variant="contained"
            color="secondary"
          >
            Logout
          </Button>
            </div>
            </div>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <div style={{display:"flex",gap:"1rem"}}>
          <button className='start' onClick={startTrivia}>
            Start
          </button>
          <Link to="/home">
          <button className='start'>
            Return to home
          </button>
          </Link>
          </div>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        <div style={{display:"flex",gap:"1rem"}}>
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <Link to="/home">
          <button className='next' >
            Exit game
          </button>
          </Link>
        ) : null}
        </div>

      </Wrapper>
    </>
  );
};

export default App;
