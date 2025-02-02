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
      .catch(error => {
        console.error('Error fetching children:', error);
      });
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

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Child Profiles</h1>
      <button onClick={() => navigate('/add-child')} className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>Add Child</button>
      <select onChange={handleChildChange} value={selectedChild ? selectedChild._id : ''} className="mt-4">
        <option value="" disabled>Select a child</option>
        {children.map(child => (
          <option key={child._id} value={child._id}>
            {child.firstName} {child.lastName}
          </option>
        ))}
        <option value="add-child">Add New Child</option>
      </select>
      {selectedChild && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Selected Child</h2>
          <p><strong>Name:</strong> {selectedChild.firstName} {selectedChild.lastName}</p>
          <p><strong>Birthdate:</strong> {selectedChild.birthdate}</p>
          <p><strong>Gender:</strong> {selectedChild.gender}</p>
          <p><strong>Age:</strong> {calculateAge(selectedChild.birthdate)}</p>
          <button onClick={() => navigate(`/edit-child/${selectedChild._id}`)} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded">Edit Profile</button>
        </div>
      )}
      {children.length === 0 && <p>Loading children...</p>}
    </div>
  );
};

export default ChildProfiles;
