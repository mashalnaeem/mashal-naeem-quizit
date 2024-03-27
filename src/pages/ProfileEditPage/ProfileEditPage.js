import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileEditPage = () => {
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
      const token = sessionStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/users/${userId}`, {
        username,
        email,
        existingPassword,
        newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccessMessage('Profile updated successfully.');
    //   setTimeout(() => {
    //     window.location.href = `/${userId}/profile`;
    //   }, 2000);
    
    } catch (error) {
      setError('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="existingPassword">Existing Password</label>
          <input
            type="password"
            id="existingPassword"
            name="existingPassword"
            value={formData.existingPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
