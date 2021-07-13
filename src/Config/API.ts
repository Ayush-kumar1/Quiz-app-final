import { shuffleArray } from './shuffle';



export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type QuestionsState = Question & { answers: string[] };


  // const{category}=useCategory()

 export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {

 ;
  // const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const endpoint='https://opentdb.com/api.php?amount=10&category=21&type=multiple'//sports
  // const endpoint="https://opentdb.com/api.php?amount=10&category=15&type=multiple"//video-game
  // const endpoint="https://opentdb.com/api.php?amount=10&category=15&type=multiple"//anime
  const data = await (await fetch(endpoint)).json();
 

  console.log(data)
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }))
};




