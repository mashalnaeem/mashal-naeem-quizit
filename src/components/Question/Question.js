import "./Question.scss";

import { useState } from "react";
import { Button } from 'react-bootstrap';

import Input from '../Input/Input';

const Question = ({ questions, setFormData, questionErrors }) => {

const [errors, setErrors] = useState("");

    const handleQuestionChange = (e, index, field, subIndex) => {
        
        const { value } = e.target;
        const updatedQuestions = [...questions];
        if (field === 'incorrect_answers') {
            updatedQuestions[index].incorrect_answers[subIndex] = value;
        } else {
            updatedQuestions[index][field] = value;
        }
        setFormData(prevData => ({
            ...prevData,
            questions: updatedQuestions,
            num_questions: updatedQuestions.length
        }));

        // Check for error conditions and set error messages
        const newErrors = [...questionErrors];
        if (field === 'question' && !value.trim()) {
            newErrors[index] = { ...newErrors[index], question: 'Question is required' };
        } else if (field === 'correct_answer' && !value.trim()) {
            newErrors[index] = { ...newErrors[index], correct_answer: 'Correct answer is required' };
        } else if (field === 'incorrect_answers' && subIndex === 0 && !value.trim()) {
            newErrors[index] = { ...newErrors[index], [`incorrect_answers[${subIndex}]`]: 'First incorrect answer is required' };
        } else {
            newErrors[index] = { ...newErrors[index], [field]: '' };
        }
        setErrors(newErrors);
    };

    const handleRemoveQuestion = (index) => {

        const updatedQuestions = questions.filter((_, i) => i !== index);
        setFormData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    };

    const handleAddQuestion = () => {

        setFormData(prevData => ({
            ...prevData,
            questions: [...prevData.questions, { question: '', correct_answer: '', incorrect_answers: ['', '', ''] }]
        }));
    };

    return (
        <div>
            <p className="question__text">Total Questions: {questions.length}</p>
            <Button className="question__button" type="button" onClick={handleAddQuestion}>Add Question</Button>

            {questions.map((question, index) => (
                <div key={index}>
                    <Input
                        type="text"
                        name={`questions[${index}].question`}
                        value={question.question}
                        onChange={(e) => handleQuestionChange(e, index, 'question')}
                        label={`Question ${index + 1}`}
                    />
                    {questionErrors[index]?.question && <p className="question__error">{questionErrors[index].question}</p>}

                    <Input
                        type="text"
                        name={`questions[${index}].correct_answer`}
                        value={question.correct_answer}
                        onChange={(e) => handleQuestionChange(e, index, 'correct_answer')}
                        label="Correct Answer"
                    />
                    {questionErrors[index]?.correct_answer && <p className="question__error">{questionErrors[index].correct_answer}</p>}

                    <div>
                        {[0, 1, 2].map(subIndex => (
                            <div key={subIndex}>
                                <Input
                                    type="text"
                                    name={`questions[${index}].incorrect_answers[${subIndex}]`}
                                    value={question.incorrect_answers[subIndex]}
                                    onChange={(e) => handleQuestionChange(e, index, 'incorrect_answers', subIndex)}
                                    label={`Incorrect Answer ${subIndex + 1}`}
                                />
                                {subIndex === 0 && questionErrors[index]?.[`incorrect_answers[${subIndex}]`] && <p className="question__error">{questionErrors[index][`incorrect_answers[${subIndex}]`]}</p>}
                            </div>
                        ))}
                    </div>
                    <Button className="question__button" type="button" onClick={() => handleRemoveQuestion(index)}>Remove</Button>
                </div>
            ))}
        </div>
    );
};

export default Question;
