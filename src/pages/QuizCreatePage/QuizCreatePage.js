import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function QuizCreatePage() {
    const { userId } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: '',
        numQuestions: 1,
        durationMinutes: '',
        isPublic: false,
        questions: [{ question: '', correctAnswer: '', incorrectAnswers: ['', '', ''] }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleQuestionChange = (e, index, field, subIndex) => {
        const { name, value } = e.target;
        const updatedQuestions = [...formData.questions];
        if (field === 'incorrectAnswers') {
            updatedQuestions[index].incorrectAnswers[subIndex] = value;
        } else {
            updatedQuestions[index][field] = value;
        }
        setFormData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    };
    

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = formData.questions.filter((_, i) => i !== index);
        setFormData(prevData => ({
            ...prevData,
            questions: updatedQuestions
        }));
    };

    const handleAddQuestion = () => {
        setFormData(prevData => ({
            ...prevData,
            questions: [...prevData.questions, { question: '', correctAnswer: '', incorrectAnswers: ['', '', ''] }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/user_quizzes/${userId}`, formData);
            console.log('New user quiz created:', response.data);
            // Optionally, redirect to a success page or display a success message
        } catch (error) {
            console.error('Error creating user quiz:', error);
            // Handle error, display error message, etc.
        }
    };

console.log(formData)
    return (
        <div>
            <h2>Create User Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Language">Language</option>
                        <option value="Science">Science</option>
                        <option value="Math">Math</option>
                        <option value="History">History</option>
                        <option value="Social Studies">Social Studies</option>
                        <option value="Technology">Technology</option>
                        <option value="Other">Other</option>
                    </select>
                    {formData.category === "Other" && (
                        <input
                            type="text"
                            name="otherCategory"
                            placeholder="Enter Other Category"
                            value={formData.otherCategory}
                            onChange={handleChange}
                            required
                        />
                    )}
                </div>
                <div>
                    <label>Difficulty:</label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Intermediate</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label>Duration (Minutes):</label>
                    <input type="number" name="durationMinutes" value={formData.durationMinutes} onChange={handleChange} required />
                </div>
                <div>
                    <label>Is Public:</label>
                    <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
                </div>
                <div>
                    <p>Total Questions: {formData.questions.length}</p>
                    <button type="button" onClick={handleAddQuestion}>Add Question</button>
                    {formData.questions.map((question, index) => (
                        <div key={index}>
                            <label>Question {index + 1}:</label>
                            <input
                                type="text"
                                name={`questions[${index}].question`}
                                value={formData.questions[index].question}
                                onChange={(e) => handleQuestionChange(e, index, 'question')}
                                required
                            />
                            <div>
                                <label>Correct Answer:</label>
                                <input
                                    type="text"
                                    name={`questions[${index}].correctAnswer`}
                                    value={formData.questions[index].correctAnswer}
                                    onChange={(e) => handleQuestionChange(e, index, 'correctAnswer')}
                                    required
                                />
                            </div>
                            <div>
                                <label>Incorrect Answers:</label>
                                <input
                                    type="text"
                                    name={`questions[${index}].incorrectAnswers[0]`}
                                    value={formData.questions[index].incorrectAnswers[0]}
                                    onChange={(e) => handleQuestionChange(e, index, 'incorrectAnswers', 0)}
                                    required
                                />
                                <input
                                    type="text"
                                    name={`questions[${index}].incorrectAnswers[1]`}
                                    value={formData.questions[index].incorrectAnswers[1]}
                                    onChange={(e) => handleQuestionChange(e, index, 'incorrectAnswers', 1)}
                                    required
                                />
                                <input
                                    type="text"
                                    name={`questions[${index}].incorrectAnswers[2]`}
                                    value={formData.questions[index].incorrectAnswers[2]}
                                    onChange={(e) => handleQuestionChange(e, index, 'incorrectAnswers', 2)}
                                    required
                                />

                            </div>
                            <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default QuizCreatePage;
