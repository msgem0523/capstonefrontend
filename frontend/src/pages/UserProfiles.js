import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5000/api/users', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('User added successfully!');
      navigate('/userprofiles');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="p-4">
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

// EditUser Component
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

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
      const response = await axios.put(`http://localhost:5000/api/users/${id}`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('User updated successfully!');
      navigate(`/user/${id}`);
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

// SelectedUser Component
const SelectedUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch children of the user
    const fetchChildren = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}/children`);
        setChildren(response.data);
      } catch (error) {
        console.error('Error fetching children data:', error);
      }
    };

    fetchUser();
    fetchChildren();
  }, [id]);

  const handleChildClick = (childId) => {
    navigate(`/child/${childId}`);
  };

  const handleEditUser = () => {
    navigate(`/edit-user/${id}`);
  };

  const handleAddChild = () => {
    navigate(`/add-child/${id}`);
  };

  return (
    <div className="p-4">
      {user && (
        <>
          <h1 className="text-xl font-bold">{user.name}</h1>
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
          <button onClick={handleAddChild} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Add Child</button>
        </>
      )}
    </div>
  );
};

// Main UserProfiles Component
const UserProfiles = () => {
  const { action, userId } = useParams();

  if (action === 'add') {
    return <AddUser />;
  } else if (action === 'edit') {
    return <EditUser />;
  } else if (action === 'view') {
    return <SelectedUser />;
  } else {
    return <div>Invalid action</div>;
  }
};

export default UserProfiles;