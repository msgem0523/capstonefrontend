import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfiles = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Profiles</h1>
      <button onClick={() => navigate('/add-user')} className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.firstName} {user.lastName} - {user.email}
            <button onClick={() => navigate(`/edit-user/${user._id}`)} className='ml-2 px-2 py-1 bg-yellow-500 text-white rounded'>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfiles;