import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// AddChild Component
const AddChild = ({ userId }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/children`, {
        firstName,
        lastName,
        birthdate,
        gender
      });
      console.log('Child added successfully:', response.data);
      navigate(`/user/${userId}`);
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            name="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [childData, setChildData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
  });

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
    try {
      const response = await axios.put(`http://localhost:5000/api/children/${id}`, childData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Child updated successfully!');
      navigate(`/child/${id}`);
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

// SelectedChild Component
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

// Main ChildProfiles Component
const ChildProfiles = () => {
  const { action, userId, childId } = useParams();

  if (action === 'add') {
    return <AddChild userId={userId} />;
  } else if (action === 'edit') {
    return <EditChild />;
  } else if (action === 'view') {
    return <SelectedChild />;
  } else {
    return <div>Invalid action</div>;
  }
};

export default ChildProfiles;
