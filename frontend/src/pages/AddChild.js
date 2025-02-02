import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddChild = () => {
  const [childData, setChildData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/children', childData, {
        headers: { 'Content-Type': 'application/json' }  // ✅ Ensure JSON format
      });
  
      alert('Child added successfully!');
      navigate('/profiles');
    } catch (error) {
      console.error('Error adding child:', error.response ? error.response.data : error);
      alert(`Failed to add child: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add Child</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={childData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={childData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            name="birthdate"
            value={childData.birthdate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={childData.gender}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Child</button>
      </form>
    </div>
  );
};

export default AddChild;