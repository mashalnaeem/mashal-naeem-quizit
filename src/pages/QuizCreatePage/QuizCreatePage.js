import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import Question from '../../components/Question/Question';
import Input from '../../components/Input/Input';


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

    useEffect(() => {
        if (mode === 'edit') {

            // Fetch quiz data if in edit mode, extract quiz ID from the URL
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

        // Adjust for checkbox value and other inputs
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevData => ({
            ...prevData,
            [name]: newValue
        }));
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (formData._id) {
                // Update quiz if quiz ID exists
                response = await axios.put(`http://localhost:8080/api/user_quizzes/${userId}/${formData._id}`, formData);
            } else {
                // Create new quiz if quiz ID does not exist
                response = await axios.post(`http://localhost:8080/api/user_quizzes/${userId}`, formData);
            }
            setShowModal(true);

        } catch (error) {
            console.error('Error creating/updating quiz:', error);
            // Handle error, display error message, etc.
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(`/${userId}/user_quizzes`);
    };

    return (
        <div>
           <h2>{mode === 'edit' ? 'Edit Quiz' : 'Create User Quiz'}</h2>
            <form onSubmit={handleSubmit}>

                <Input
                    name="title"
                    value={formData.title}
                    label="Title"
                    onChange={handleChange}
                    type="text"
                />
                <Input
                    name="description"
                    value={formData.description}
                    label="Description"
                    onChange={handleChange}
                    type="text"
                />
                <div>
                    <label>Category</label>
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
                        <Input
                            name="otherCategory"
                            value={formData.otherCategory}
                            onChange={handleChange}
                            type="text"
                       />
                    )}
                </div>
                <div>
                    <label>Difficulty</label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <Input
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    label="Duration (minutes)"
                    onChange={handleChange}
                    type="number"
                />
                <div>
                    <label>Is Public:</label>
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
                />
                <Button varient="primary" type="submit">Submit</Button>
            </form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Quiz Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The quiz has been successfully updated.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Go to My Quizzes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default QuizCreatePage;
