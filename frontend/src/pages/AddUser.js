import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();

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
    if (!userData.name || !userData.email) {
      console.error('All fields are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/users', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('User added successfully!');
      navigate('/userprofiles');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;