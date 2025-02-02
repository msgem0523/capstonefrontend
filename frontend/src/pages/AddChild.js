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
    // Validate data before sending the request
    if (!childData.firstName || !childData.lastName || !childData.birthdate || !childData.gender) {
      console.error('All fields are required');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/children', 
        {
            firstName: childData.firstName.trim(),
            lastName: childData.lastName.trim(),
            birthdate: childData.birthdate,
            gender: childData.gender
        },
        {
            headers: { 'Content-Type': 'application/json' } 
        }  
      );

      alert('Child added successfully!');
      navigate('/child');
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
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={childData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={childData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={childData.gender === 'Other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>
        <button type="submit">Add Child</button>
      </form>
    </div>
  );
};

export default AddChild;