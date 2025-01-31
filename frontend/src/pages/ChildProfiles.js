import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChildProfiles = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const navigate = useNavigate();

  // Fetch child profiles from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/children')  // Adjust this endpoint as needed
      .then(response => {
        setChildren(response.data);
        if (response.data.length > 0) {
          setSelectedChild(response.data[0]); // Auto-select first child
        }
      })
      .catch(error => console.error('Error fetching child profiles:', error));
  }, []);

  // Handle child selection
  const handleChildChange = (event) => {
    const childId = event.target.value;
    if (childId === 'add-child') {
      navigate('/add-child'); // Redirect to add child page
    } else {
      const child = children.find(child => child._id === childId);
      setSelectedChild(child);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Child Profiles</h1>

      {/* Dropdown List to Select Child */}
      <select
        onChange={handleChildChange}
        className="p-2 border rounded w-full"
        value={selectedChild ? selectedChild._id : ''}
      >
        {children.map(child => (
          <option key={child._id} value={child._id}>
            {child.firstName} {child.lastName}
          </option>
        ))}
        <option value="add-child">➕ Add Child</option>
      </select>

      {/* Display Child Profile Information */}
      {selectedChild && (
        <div className="mt-6 p-4 border rounded shadow-md">
          <div className="flex items-center">
            {/* Profile Picture */}
            <img
              src={selectedChild.profilePicture || 'https://via.placeholder.com/100'}
              alt="Child"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{selectedChild.firstName} {selectedChild.lastName}</h2>
              <p className="text-gray-600">Age: {calculateAge(selectedChild.birthdate)}</p>
            </div>
          </div>

          {/* Medical History & Milestones Links */}
          <div className="mt-4">
            <button
              onClick={() => navigate(`/medical-records/${selectedChild._id}`)}
              className="text-blue-500 hover:underline mr-4"
            >
              📋 View Medical History
            </button>
            <button
              onClick={() => navigate(`/milestones/${selectedChild._id}`)}
              className="text-green-500 hover:underline"
            >
              🚀 View Developmental Milestones
            </button>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => navigate(`/edit-child/${selectedChild._id}`)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            ✏️ Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate age from birthdate
const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default ChildProfiles;
