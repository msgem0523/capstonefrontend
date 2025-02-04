import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SelectedChild = () => {
  const [child, setChild] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch child details
    axios.get(`http://localhost:5000/api/children/${id}`)
      .then(response => {
        setChild(response.data);
      })
      .catch(error => {
        console.error('Error fetching child data:', error);
      });
  }, [id]);

  return (
    <div className="p-4">
      {child && (
        <>
          <h1 className="text-xl font-bold">{child.firstName} {child.lastName}</h1>
          <p>Birthdate: {child.birthdate}</p>
          <p>Gender: {child.gender}</p>
          <p>Age: {calculateAge(child.birthdate)}</p>
        </>
      )}
    </div>
  );
};

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default SelectedChild;