import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditChild = () => {
  const { id } = useParams(); // Get child ID from URL
  const navigate = useNavigate();
  const [childData, setChildData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: 'Male',
  });

  // Fetch existing child data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/children/${id}`)
      .then(response => setChildData(response.data))
      .catch(error => console.error('Error fetching child data:', error));
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setChildData({ ...childData, [e.target.name]: e.target.value });
  };

  // Submit form to update child
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/children/${id}`, childData);
      alert('Child profile updated successfully!');
      navigate('/profiles'); // Redirect to child profiles page
    } catch (error) {
      console.error('Error updating child:', error);
      alert('Failed to update child profile.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Child Profile</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-md">
        <label className="block mb-2">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={childData.firstName}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full mb-3"
        />

        <label className="block mb-2">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={childData.lastName}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full mb-3"
        />

        <label className="block mb-2">Birthdate:</label>
        <input
          type="date"
          name="birthdate"
          value={childData.birthdate}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full mb-3"
        />

        <label className="block mb-2">Gender:</label>
        <select
          name="gender"
          value={childData.gender}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-3"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditChild;
