import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SelectedChild = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${id}`);
        setChild(response.data);
      } catch (error) {
        console.error('Error fetching child data:', error);
      }
    };

    fetchChild();
  }, [id]);

  const handleViewMedicalRecord = () => {
    navigate(`/child/${id}/medical-record`);
  };

  return (
    <div className="p-4">
      {child ? (
        <>
          <h1 className="text-xl font-bold">{child.firstName} {child.lastName}</h1>
          <p>Birthdate: {child.birthdate}</p>
          <p>Gender: {child.gender}</p>
          <button onClick={handleViewMedicalRecord} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">View Medical Record</button>
        </>
      ) : (
        <p>Loading child profile...</p>
      )}
    </div>
  );
};

export default SelectedChild;