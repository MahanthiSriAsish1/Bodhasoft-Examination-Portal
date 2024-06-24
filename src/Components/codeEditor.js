import React, { useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import TextInput from './textInput'
import "../Styles/codeEditor.css"

const CodeEditor = ({ key, index, onNext, onPrev, isPrevDisabled, isNextDisabled, onSubmit, onEditorChange, currentAnswer, questionType }) => {
  const handleEditorChange = (value) => {
    onEditorChange(value);
  };

  const handleTextAreaChange = (event) => {
    onEditorChange(event.target.value);
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  useEffect(() => {
    onEditorChange('');
  }, [index]);

  return (
    <div className='code-section'>
      <div className='navigation'>
        {isNextDisabled && (
          <button className='submitButton' type="button" onClick={handleSubmit}>
            <span>Submit</span>
          </button>
        )}
        {!isNextDisabled && (
          <button className='button' type="button" onClick={handleNext}>
            <span>Next</span>
          </button>
        )}
        {!isPrevDisabled && (
          <button className='prevButton' type="button" onClick={handlePrev}>
            <span>Prev</span>
          </button>
        )}
      </div>
      <div className='editor'>
        {questionType === 'code' ? (
          <Editor
            value={currentAnswer}
            defaultLanguage="c"
            theme="vs-dark"
            onChange={handleEditorChange}
          />
        ) : (
          <TextInput
            className='text-area'
            value={currentAnswer}
            onChange={handleTextAreaChange}
            placeholder='Type your answer here...'
          />
        )}
      </div>
    </div>
  )
}

export default CodeEditor
