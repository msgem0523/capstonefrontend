import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditChild = () => {
  const [childData, setChildData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/children/${id}`)
      .then(response => {
        setChildData(response.data);
      })
      .catch(error => {
        console.error('Error fetching child data:', error);
      });
  }, [id]);

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
      const response = await axios.put(`http://localhost:5000/api/children/${id}`, childData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Child updated successfully!');
      navigate('/child');
    } catch (error) {
      console.error('Error updating child:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Edit Child</h1>
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
        <button type="submit">Update Child</button>
      </form>
    </div>
  );
};

export default EditChild;
