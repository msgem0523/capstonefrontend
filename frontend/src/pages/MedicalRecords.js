import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

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

  const handleAddRecord = async ( childId, date, location, height, weight, notes) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/children/${childId}/medical-records`,  // Use childId in URL
        {
          date,
          location,
          notes
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding medical record:", error.response?.data || error.message);
      throw error;
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
      <Navbar />
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

// EditMedicalRecord Component
const EditMedicalRecord = () => {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [recordData, setRecordData] = useState({
    date: '',
    location: '',
    height: '',
    weight: '',
    headCircumference: '',
    notes: ''
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medical-records/${recordId}`);
        setRecordData(response.data);
      } catch (error) {
        console.error('Error fetching medical record:', error);
      }
    };

    fetchRecord();
  }, [recordId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/medical-records/${recordId}`, recordData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Medical record updated successfully!');
      navigate(`/childprofiles/view/${recordData.childId}`);
    } catch (error) {
      console.error('Error updating medical record:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Edit Medical Record</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={recordData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <select name="location" value={recordData.location} onChange={handleChange}>
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
            value={recordData.height}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weight (in pounds):</label>
          <input
            type="number"
            name="weight"
            value={recordData.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Head Circumference (in inches):</label>
          <input
            type="number"
            name="headCircumference"
            value={recordData.headCircumference}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={recordData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Update Medical Record</button>
      </form>
    </div>
  );
};

export default MedicalRecords;
export { AddMedicalRecord, EditMedicalRecord };