import React from 'react'
import "../Styles/Question.css"

const Question = ({index , message}) => {
  return (
    <div className='question-div'>
      <div><label>{index+1}.</label>&nbsp;{message}</div>
    </div>
  )
}

export default Question
