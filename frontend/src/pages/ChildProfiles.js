import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// AddChild Component
const AddChild = ({ userId }) => {
  const navigate = useNavigate();
  const [childData, setChildData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
  });

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
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/children`, childData);
      alert('Child added successfully!');
      navigate(`/userprofiles/view/${userId}`);
    } catch (error) {
      console.error('Error adding child:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add Child for User {userId}</h1>
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
          <select value={childData.gender} onChange={handleChange} name="gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Add Child</button>
      </form>
    </div>
  );
};

// EditChild Component
const EditChild = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [childData, setChildData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/children/${childId}`)
      .then(response => {
        setChildData(response.data);
      })
      .catch(error => {
        console.error('Error fetching child data:', error);
      });
  }, [childId]);

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
      const response = await axios.put(`http://localhost:5000/api/children/${childId}`, childData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Child updated successfully!');
      navigate(`/childprofiles/view/${childId}`);
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
          <select value={childData.gender} onChange={handleChange} name="gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Update Child</button>
      </form>
    </div>
  );
};

// AddMedicalRecord Component
const AddMedicalRecord = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [newRecord, setNewRecord] = useState({
    date: '',
    location: '',
    height: '',
    weight: '',
    headCircumference: '',
    notes: ''
  });

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
      console.log(`${childId}`)
      const response = await axios.post(`http://localhost:5000/api/children/${childId}/medical-records`, newRecord);
      alert('Medical record added successfully!');
      navigate(`/childprofiles/view/${childId}`);
    } catch (error) {
      console.error('Error adding medical record:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add Medical Record for Child {childId}</h1>
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
          <label>Head Circumference (in inches):</label>
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

// SelectedChild Component
const SelectedChild = () => {
  const { userId, childId } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${childId}`);
        setChild(response.data);
      } catch (error) {
        console.error('Error fetching child data:', error);
      }
    };

    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${childId}/medical-records`);
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchChild();
    fetchMedicalRecords();
  }, [childId]);

  const handleAddMedicalRecord = () => {
    navigate(`/childprofiles/add-medical-record/${userId}/${childId}`);
  };

  if (!child) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{child.firstName} {child.lastName}</h1>
      <p>Birthdate: {child.birthdate}</p>
      <p>Gender: {child.gender}</p>
      <h2 className="text-lg font-bold mt-4">Medical Records</h2>
      {medicalRecords.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <ul className="mt-4">
          {medicalRecords.map(record => (
            <li key={record._id} className="border p-2 my-2 rounded">
              {record.date} - {record.notes}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddMedicalRecord} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Medical Record</button>
    </div>
  );
};

// Main ChildProfiles Component
const ChildProfiles = () => {
  const { action, userId, childId } = useParams();

  if (action === 'add') {
    return <AddChild userId={userId} />;
  } else if (action === 'edit') {
    return <EditChild />;
  } else if (action === 'view') {
    return <SelectedChild />;
  } else if (action === 'add-medical-record') {
    return <AddMedicalRecord />;
  } else {
    return <div>Invalid action</div>;
  }
};

export default ChildProfiles;
