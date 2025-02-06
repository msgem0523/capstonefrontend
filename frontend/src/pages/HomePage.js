import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    navigate('/add-user');
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-xl font-bold">Welcome to your own health tracker for your little ones. Please select your name to begin.</h1>
      <ul>
        {users.map(user => (
          <li key={user._id} onClick={() => navigate(`/userprofiles/view/${user._id}`)} className="cursor-pointer">
            {user.name}
          </li>
        ))}
      </ul>
      <button onClick={handleAddUser} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add User</button>
    </div>
  );
};

export default HomePage;