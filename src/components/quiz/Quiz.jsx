import { useRef, useState } from "react";
import classicVintageCarsQuiz from "../../utils/data";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(classicVintageCarsQuiz[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  const checkAnswer = (e, answer) => {
    if (lock === false) {
      if (question.ans === answer) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const nextQuestion = () => {
    if (lock === true) {
      if (index === classicVintageCarsQuiz.length - 1) {
        setResult(true);
        return 0;
      }

      setIndex(index + 1);
      setQuestion(classicVintageCarsQuiz[index]);
      setLock(false);
      optionArray.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(classicVintageCarsQuiz[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className=" w-[650px] m-auto bg-white text-[#262626] flex flex-col gap-3 px-[50px] py-[40px] rounded-lg shadow-2xl ">
      <h1>Quiz App</h1>
      <hr className="h-[2px] border-none bg-[#707070] " />
      {result ? (
        <></>
      ) : (
        <>
          <h2 className="text-[27px] font-medium ">
            {index + 1}. {question.question}
          </h2>
          <ul className="">
            <li
              ref={Option1}
              onClick={(e) => checkAnswer(e, 1)}
              className=" flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-lg mb-5 text-[20px] cursor-pointer "
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => checkAnswer(e, 2)}
              className=" flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-lg mb-5 text-[20px] cursor-pointer "
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => checkAnswer(e, 3)}
              className=" flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-lg mb-5 text-[20px] cursor-pointer "
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => checkAnswer(e, 4)}
              className=" flex items-center h-[70px] pl-[15px] border border-[#686868] rounded-lg mb-5 text-[20px] cursor-pointer "
            >
              {question.option4}
            </li>
          </ul>
          <button
            onClick={nextQuestion}
            className="m-auto w-[250px] h-[65px] bg-[#553f9a] text-white text-[25px] font-medium rounded-lg cursor-pointer  "
          >
            next
          </button>
          <div className=" m-auto text-[18px] ">
            {" "}
            {index + 1} of {classicVintageCarsQuiz.length}{" "}
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {classicVintageCarsQuiz.length}{" "}
          </h2>
          <button
            onClick={reset}
            className="m-auto w-[250px] h-[65px] bg-[#553f9a] text-white text-[25px] font-medium rounded-lg cursor-pointer  "
          >
            Reset
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Quiz;
