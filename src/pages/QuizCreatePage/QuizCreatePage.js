import { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom"

function CreateUserQuizPage() {

const { userId } = useParams();
  
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        // difficulty: 'medium', //
        numQuestions: 0,
        durationMinutes: 0,
        isPublic: false,
        // imageUrl: '',
        // questions: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
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
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required />
                </div>
                <div>
                    <label>Difficulty:</label>
                    {/* <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select> */}
                </div>
                <div>
                    <label>Number of Questions:</label>
                    <input type="number" name="numQuestions" value={formData.numQuestions} onChange={handleChange} required />
                </div>
                <div>
                    <label>Duration (Minutes):</label>
                    <input type="number" name="durationMinutes" value={formData.durationMinutes} onChange={handleChange} required />
                </div>
                <div>
                    <label>Is Public:</label>
                    <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
                </div>
                {/* <div>
                    <label>Image URL:</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </div> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateUserQuizPage;
