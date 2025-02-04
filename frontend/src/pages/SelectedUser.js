import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SelectedUser = () => {
  const [user, setUser] = useState(null);
  const [children, setChildren] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch children of the user
    axios.get(`http://localhost:5000/api/users/${id}/children`)
      .then(response => {
        setChildren(response.data);
      })
      .catch(error => {
        console.error('Error fetching children data:', error);
      });
  }, [id]);

  const handleChildClick = (childId) => {
    navigate(`/child/${childId}`);
  };

  const handleEditUser = () => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div className="p-4">
      {user && (
        <>
          <h1 className="text-xl font-bold">{user.firstName} {user.lastName}</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleEditUser} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded">Edit User</button>
          <h2 className="text-lg font-bold mt-4">Children</h2>
          {children.length === 0 ? (
            <p>No children found.</p>
          ) : (
            <ul className="mt-4">
              {children.map(child => (
                <li key={child._id} className="border p-2 my-2 rounded cursor-pointer" onClick={() => handleChildClick(child._id)}>
                  {child.firstName} {child.lastName}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SelectedUser;