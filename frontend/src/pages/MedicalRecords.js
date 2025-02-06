import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MedicalRecords = () => {
  const { childId } = useParams();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    date: '',
    location: '',
    height: '',
    weight: '',
    headCircumference: '',
    notes: ''
  });

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${childId}/medical-records`);
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, [childId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleAddRecord = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/children/${childId}/medical-records`, newRecord);
      setMedicalRecords([...medicalRecords, response.data]);
      setNewRecord({
        date: '',
        location: '',
        height: '',
        weight: '',
        headCircumference: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(`http://localhost:5000/api/children/${childId}/medical-records/${recordId}`);
      setMedicalRecords(medicalRecords.filter(record => record._id !== recordId));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Medical Records</h1>
      <div>
        <h2 className="text-lg font-bold">Add Medical Record</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddRecord(); }}>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={newRecord.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <select name="location" value={newRecord.location} onChange={handleChange}>
              <option value="">Select Location</option>
              <option value="Doctor Office">Doctor Office</option>
              <option value="Hospital">Hospital</option>
              <option value="Home">Home</option>
            </select>
          </div>
          <div>
            <label>Height (in inches):</label>
            <input
              type="number"
              name="height"
              value={newRecord.height}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Weight (in pounds):</label>
            <input
              type="number"
              name="weight"
              value={newRecord.weight}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Head Circumference (in centimenters):</label>
            <input
              type="number"
              name="headCircumference"
              value={newRecord.headCircumference}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Notes:</label>
            <textarea
              name="notes"
              value={newRecord.notes}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Medical Record</button>
        </form>
      </div>
      <ul className="mt-4">
        {medicalRecords.map(record => (
          <li key={record._id} className="border p-2 my-2 rounded">
            {record.date} - {record.location} - {record.height} inches - {record.weight} lbs - {record.headCircumference} inches - {record.notes}
            <button onClick={() => handleDeleteRecord(record._id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// AddMedicalRecord Component
const AddMedicalRecord = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const [newRecord, setNewRecord] = useState({
    date: '',
    location: '',
    height: '',
    weight: '',
    headCircumference: '',
    notes: ''
  });

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${childId}`);
        setChild(response.data);
      } catch (error) {
        console.error('Error fetching child data:', error);
      }
    };

    fetchChild();
  }, [childId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/children/${childId}/medical-records`, newRecord);
      alert('Medical record added successfully!');
      navigate(`/childprofiles/view/${childId}`);
    } catch (error) {
      console.error('Error adding medical record:', error);
    }
  };

  if (!child) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add Medical Record for {child.firstName} {child.lastName}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newRecord.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <select name="location" value={newRecord.location} onChange={handleChange}>
            <option value="">Select Location</option>
            <option value="Doctor Office">Doctor Office</option>
            <option value="Hospital">Hospital</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <div>
          <label>Height (in inches):</label>
          <input
            type="number"
            name="height"
            value={newRecord.height}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weight (in pounds):</label>
          <input
            type="number"
            name="weight"
            value={newRecord.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Head Circumference (in centimeters):</label>
          <input
            type="number"
            name="headCircumference"
            value={newRecord.headCircumference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={newRecord.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Medical Record</button>
      </form>
    </div>
  );
};

export default MedicalRecords;
export { AddMedicalRecord };