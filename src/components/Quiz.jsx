import { useState, useCallback } from "react"

import QuestionTimer from "./QuestionTimer"

import QUESTIONS from '../questions'
import quizComplete from '../assets/quiz-complete.png'

export default function Quiz() {

    const [userAnswers, setUsersAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length
    
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUsersAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })
    }, [])

    handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizComplete} alt="ttt" />
                <h2>Quiz complete</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5)

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeOut={10000} onTimeOut={handleSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) =>
                        <li key={answer} className="answer"><button onClick={() => handleSelectAnswer(answer)}>{answer}</button></li>)}
                </ul>
            </div>
        </div>
    )
}