import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchChildren = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/children`
        );
        setChildren(response.data);
      } catch (error) {
        console.error("Error fetching children:", error);
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
      console.error("Error deleting child:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-xl font-bold">{user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleEditUser} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Edit User</button>
      <h2 className="text-lg font-bold mt-4">Children</h2>
      <ul>
        {children.map(child => (
          <li key={child._id} className="flex justify-between items-center">
            <span onClick={() => navigate(`/childprofiles/view/${child._id}`)} className="cursor-pointer">{child.firstName} {child.lastName}</span>
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

export default UserProfilePage;
