import { Button } from 'react-bootstrap';

import Input from '../Input/Input';

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
            <Button type="button" onClick={handleAddQuestion}>Add Question</Button>

            {questions.map((question, index) => (
                <div key={index}>
                    <Input
                        type="text"
                        name={`questions[${index}].question`}
                        value={question.question}
                        onChange={(e) => handleQuestionChange(e, index, 'question')}
                        label={`Question ${index + 1}`}
                    />

                    <Input
                        type="text"
                        name={`questions[${index}].correct_answer`}
                        value={question.correct_answer}
                        onChange={(e) => handleQuestionChange(e, index, 'correct_answer')}
                        label="Correct Answer"
                    />
                    <div>
                        {[0, 1, 2].map(subIndex => (
                            <Input
                                key={subIndex}
                                type="text"
                                name={`questions[${index}].incorrect_answers[${subIndex}]`}
                                value={question.incorrect_answers[subIndex]}
                                onChange={(e) => handleQuestionChange(e, index, 'incorrect_answers', subIndex)}
                                label={`Incorrect Answer ${subIndex + 1}`}
                            />
                        ))}
                    </div>
                    <Button varient="primary" type="button" onClick={() => handleRemoveQuestion(index)}>Remove</Button>
                </div>
            ))}
        </div>
    );
};

export default Question;
