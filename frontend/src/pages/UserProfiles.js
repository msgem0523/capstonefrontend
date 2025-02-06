import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

// AddUser Component
const AddUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', userData);
      alert('User added successfully!');
      navigate('/');
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
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add User</button>
      </form>
    </div>
  );
};

// EditUser Component
const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('User updated successfully!');
      navigate(`/userprofiles/view/${userId}`);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-4">
      < Navbar />
      <h1 className="text-xl font-bold">Edit User</h1>
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
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Update User</button>
      </form>
    </div>
  );
};

export { AddUser, EditUser };