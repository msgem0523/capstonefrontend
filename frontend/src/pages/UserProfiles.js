import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

// AddUser Component
const AddUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', userData);
      alert('User added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-xl font-bold">Add User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add User</button>
      </form>
    </div>
  );
};

// EditUser Component
const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('User updated successfully!');
      navigate(`/userprofiles/view/${userId}`);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Update User</button>
      </form>
    </div>
  );
};

// UserProfilePage Component
const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchChildren = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/children`);
        setChildren(response.data);
      } catch (error) {
        console.error('Error fetching children:', error);
      }
    };

    fetchUser();
    fetchChildren();
  }, [userId]);

  const handleAddChild = () => {
    navigate(`/userprofiles/${userId}/add-child`);
  };

  const handleEditUser = () => {
    navigate(`/userprofiles/edit/${userId}`);
  };

  const handleEditChild = (childId) => {
    navigate(`/childprofiles/edit/${childId}`);
  };

  const handleDeleteChild = async (childId) => {
    try {
      await axios.delete(`http://localhost:5000/api/children/${childId}`);
      setChildren(children.filter(child => child._id !== childId));
    } catch (error) {
      console.error('Error deleting child:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleEditUser} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Edit User</button>
      <h2 className="text-lg font-bold mt-4">Children</h2>
      <ul>
        {children.map(child => (
          <li key={child._id} className="flex justify-between items-center">
            <span onClick={() => navigate(`/childprofiles/view/${child._id}`)} className="cursor-pointer">{child.name}</span>
            <div>
              <button onClick={() => handleEditChild(child._id)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => handleDeleteChild(child._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleAddChild} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Child</button>
    </div>
  );
};

export { AddUser, EditUser, UserProfilePage };