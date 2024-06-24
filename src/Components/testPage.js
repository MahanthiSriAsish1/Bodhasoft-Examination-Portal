import React, { useState } from 'react';
import CodeEditor from './codeEditor';
import Question from './Question';
import Navbar from './navbar';
import "../Styles/testPage.css";

const TestPage = ({ questions, onSubmit}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500); // 500 milliseconds delay (0.5 seconds)
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }, 500); // 500 milliseconds delay (0.5 seconds)
    }
  };

  const handleSubmit = () => {
    const formattedData = questions.map((questionObj, index) => ({
      question: questionObj.question,
      answer: answers[index]
    }));
    onSubmit(formattedData);
  };

  const handleEditorChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="Parent">
      <div className='navbar'>
        <Navbar onSubmit={handleSubmit}/>
      </div>
      <div className='mainPage'>
        <Question index={currentQuestionIndex} message={currentQuestion.question} />
        <CodeEditor
          key={currentQuestionIndex}
          index={currentQuestionIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          isPrevDisabled={currentQuestionIndex === 0}
          isNextDisabled={currentQuestionIndex === questions.length - 1}
          onSubmit={handleSubmit}
          onEditorChange={handleEditorChange}
          currentAnswer={answers[currentQuestionIndex]}
          questionType={currentQuestion.type}
        />
      </div>
    </div>
  );
}

export default TestPage;
