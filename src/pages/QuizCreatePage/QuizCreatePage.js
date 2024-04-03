import "./QuizCreatePage.scss"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import ModalComponent from "../../components/ModalComponent/ModalComponent";
import Question from "../../components/Question/Question"
import Input from '../../components/Input/Input';
import BackIcon from '../../components/BackIcon/BackIcon';

function QuizCreatePage({ mode }) {

    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        userId: userId,
        title: '',
        description: '',
        category: '',
        difficulty: '',
        num_questions: '',
        duration_minutes: '',
        isPublic: false,
        questions: [{ question: '', correct_answer: '', incorrect_answers: ['', '', ''] }]
    });

    // Define state variables for error messages
    const [errors, setErrors] = useState("");
    const [error, setError] = useState("");
    const [questionErrors, setQuestionErrors] = useState([]);

    useEffect(() => {

        if (mode === 'edit') {
            const quizId = location.pathname.split('/').pop();
            fetchQuizData(quizId);
        }
    }, [mode, location.pathname]);

    const fetchQuizData = async (quizId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user_quizzes/${userId}/${quizId}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        // Remove error for the field being updated
        setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[name]; // Remove error for the updated field
            return updatedErrors;
        });
    
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
        }));
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate all required fields
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors['title'] = 'Title is required';
        }
        if (!formData.description.trim()) {
            newErrors['description'] = 'Description is required';
        }
        if (!formData.category.trim()) {
            newErrors['category'] = 'Category is required';
        }
        if (!formData.difficulty.trim()) {
            newErrors['difficulty'] = 'Difficulty is required';
        }
        if (!formData.duration_minutes) {
            newErrors['duration_minutes'] = 'Duration is required';
        }
        
        // Update errors state
        setErrors(newErrors);

        // Validate question fields
        const newQuestionErrors = formData.questions.map((question, index) => {

            const errors = {};
            if (!question.question.trim()) {
                errors.question = 'Question is required';
            }
            if (!question.correct_answer.trim()) {
                errors.correct_answer = 'Correct answer is required';
            }
            question.incorrect_answers.forEach((answer, subIndex) => {
                if (!answer.trim()) {
                    errors[`incorrect_answers[${subIndex}]`] = 'Incorrect answer is required';
                }
            });
            return errors;
        });

        setQuestionErrors(newQuestionErrors);
    
        // If there are errors, return without submitting the form
        if (Object.keys(newErrors).length > 0) {
            return;
        }
    
        try {
            let response;
            if (formData._id) {
                response = await axios.put(`http://localhost:8080/api/user_quizzes/${userId}/${formData._id}`, formData);
            } else {
                response = await axios.post(`http://localhost:8080/api/user_quizzes/${userId}`, formData);
            }
            setShowModal(true);
            
        } catch (error) {
            console.error('Error creating/updating quiz:', error);

            // Custom error handling based on response status
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data.message);

                } else {
                    setError('An error occurred. Please try again later.');
                }
            }
        }
    };

    const handleCloseModal = () => {

        setShowModal(false);
        navigate(`/${userId}/user_quizzes`);
    };

    return (
        <div className="create__container">

            <BackIcon className="profile__back" />

            <h2 className="create__title">{mode === 'edit' ? 'Edit Quiz' : 'Create User Quiz'}</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name="title"
                    value={formData.title}
                    label="Title"
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter A Title"
                />
                {errors.title && <p className="create__error">{errors.title}</p>}

                <label className="create__label">Description</label>
                <textarea
                    className="create__input"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter A Description">
                </textarea>
                {errors.description && <p className="create__error">{errors.description}</p>}

                <div>
                    <label className="create__label">Category</label>
                    <select 
                        className="create__select" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                    >
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
                        <Input
                            name="otherCategory"
                            value={formData.otherCategory}
                            onChange={handleChange}
                            type="text"
                        />
                    )}
                    {errors.category && <p className="create__error">{errors.category}</p>}

                </div>
                <div>
                    <label className="create__label">Difficulty</label>
                    <select 
                        className="create__select" 
                        name="difficulty" 
                        value={formData.difficulty} 
                        onChange={handleChange}
                    >
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    {errors.difficulty && <p className="create__error">{errors.difficulty}</p>}

                </div>
                <Input
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    label="Duration (minutes)"
                    onChange={handleChange}
                    type="number"
                    placeholder="0"
                />
                {errors.duration_minutes && <p className="create__error">{errors.duration_minutes}</p>}

                <div>
                    <label className="create__label">Is Public:</label>
                    <input
                        type="checkbox"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleChange}
                    />
                </div>

                <Question
                    questions={formData.questions}
                    setFormData={setFormData}
                    questionErrors={questionErrors}
                />

                {error && <p className="error-message">{error}</p>}
                <Button className="create__button" type="submit">Submit</Button>
            </form>

            <ModalComponent 
                show={showModal} 
                onHide={handleCloseModal}
                title={formData._id ? "Quiz Updated" : "Quiz Created"}
                body={`The quiz has been successfully ${formData._id ? 'updated' : 'created'}`}
                primaryButton="Go To My Quzzies"
                onClick={handleCloseModal}
            />
        </div>
    );
}

export default QuizCreatePage;
