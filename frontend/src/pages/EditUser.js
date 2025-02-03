import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate data before sending the request
    if (!userData.firstName || !userData.lastName || !userData.email) {
      console.error('All fields are required');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${id}`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('User updated successfully!');
      navigate('/userprofiles');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;