import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VaccineLog = () => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vaccines')
      .then(response => {
        setVaccines(response.data);
      })
      .catch(error => {
        console.error('Error fetching vaccine data:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Vaccine List</h1>
      {vaccines.length === 0 ? (
        <p>Loading vaccines...</p>
      ) : (
        <ul className="mt-4">
          {vaccines.map(vaccine => (
            <li key={vaccine._id} className="border p-2 my-2 rounded">
              <strong>{vaccine.name}</strong> - {vaccine.ageGroup}
              <p>{vaccine.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VaccineLog;
