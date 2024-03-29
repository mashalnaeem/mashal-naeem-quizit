import React from 'react';

const Question = ({ questions, setFormData }) => {

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
            <p>Total Questions: {questions.length}</p>
            <button type="button" onClick={handleAddQuestion}>Add Question</button>
            {questions.map((question, index) => (
                <div key={index}>
                    <label>Question {index + 1}:</label>
                    <input
                        type="text"
                        name={`questions[${index}].question`}
                        value={question.question}
                        onChange={(e) => handleQuestionChange(e, index, 'question')}
                        required
                    />
                    <div>
                        <label>Correct Answer:</label>
                        <input
                            type="text"
                            name={`questions[${index}].correct_answer`}
                            value={question.correct_answer}
                            onChange={(e) => handleQuestionChange(e, index, 'correct_answer')}
                            required
                        />
                    </div>
                    <div>
                        <label>Incorrect Answers:</label>
                        {[0, 1, 2].map(subIndex => (
                            <input
                                key={subIndex}
                                type="text"
                                name={`questions[${index}].incorrect_answers[${subIndex}]`}
                                value={question.incorrect_answers[subIndex]}
                                onChange={(e) => handleQuestionChange(e, index, 'incorrect_answers', subIndex)}
                                required
                            />
                        ))}
                    </div>
                    <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Question;
