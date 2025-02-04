import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfiles = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        console.log('Fetched users:', response.data); // Log fetched users
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">User Profiles</h1>
      <button onClick={() => navigate('/add-user')} className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>Add User</button>
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <ul className="mt-4">
          {users.map(user => (
            <li key={user._id} className="border p-2 my-2 rounded cursor-pointer" onClick={() => handleUserClick(user._id)}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfiles;