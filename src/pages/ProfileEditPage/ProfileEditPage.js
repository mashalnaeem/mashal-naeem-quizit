import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Toast } from 'react-bootstrap';

import Input from "../../components/Input/Input"

function ProfileEditPage() {

    const { userId } = useParams();
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        existingPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data;
                setFormData({
                    username: userData.username,
                    email: userData.email,
                    existingPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });

            } catch (error) {
                setError(error.response.message);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, existingPassword, newPassword, confirmNewPassword } = formData;
        // Check if new password and confirm password match
        if (newPassword !== confirmNewPassword) {
            setError('New password and confirm password do not match.');
            return;
        }
        try {
            await axios.put(`http://localhost:8080/api/users/${userId}`, {
                username: username,
                email: email,
                existingPassword: existingPassword,
                newPassword: newPassword        
            });

            setSuccessMessage('Profile updated successfully.');
            //   setTimeout(() => {
            //     window.location.href = `/${userId}/profile`;
            //   }, 2000);

        } catch (error) {
            console.log(error)
            setError('Error updating profile. Please try again.');
        }
    };

    return (
        <div className="profile-edit-container">
            <h2>Edit Profile</h2>
            <Toast show={!!successMessage || !!error} onClose={() => { setSuccessMessage(''); setError(''); }}>
                <Toast.Header closeButton={false}>
                    {successMessage ? 'Success' : 'Error'}
                </Toast.Header>
                <Toast.Body>{successMessage || error}</Toast.Body>
            </Toast>
            <form onSubmit={handleSubmit}>
                <Input label="Username" name="username" type="text" onChange={handleChange} value={formData.username} />
                <Input label="Email" name="email" type="email" onChange={handleChange} value={formData.email} />
                <Input label="Existing Password" name="existingPassword" type="password" onChange={handleChange} value={formData.existingPassword} />
                <Input label="New Password" name="newPassword" type="password" onChange={handleChange} value={formData.newPassword} />
                <Input label="Confirm New Password" name="confirmNewPassword" type="password" onChange={handleChange} value={formData.confirmNewPassword} />
                <Button type="submit" variant="primary">Update Profile</Button>
            </form>
        </div>
    );
};

export default ProfileEditPage;
