import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

// AddMilestone Component
const AddMilestone = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const [newMilestone, setNewMilestone] = useState({
    date: '',
    description: ''
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
    setNewMilestone((prevMilestone) => ({
      ...prevMilestone,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/children/${childId}/milestones`, newMilestone);
      alert('Milestone added successfully!');
      navigate(`/childprofiles/view/${childId}`);
    } catch (error) {
      console.error('Error adding milestone:', error);
    }
  };

  if (!child) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Add Milestone for {child.firstName} {child.lastName}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newMilestone.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newMilestone.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Milestone</button>
      </form>
    </div>
  );
};

// EditMilestone Component
const EditMilestone = () => {
  const { milestoneId } = useParams();
  const navigate = useNavigate();
  const [milestoneData, setMilestoneData] = useState({
    date: '',
    description: ''
  });

  useEffect(() => {
    const fetchMilestone = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/milestones/${milestoneId}`);
        setMilestoneData(response.data);
      } catch (error) {
        console.error('Error fetching milestone data:', error);
      }
    };

    fetchMilestone();
  }, [milestoneId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilestoneData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/milestones/${milestoneId}`, milestoneData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Milestone updated successfully!');
      navigate(`/childprofiles/view/${milestoneData.childId}`);
    } catch (error) {
      console.error('Error updating milestone:', error);
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-xl font-bold">Edit Milestone</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={milestoneData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={milestoneData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Update Milestone</button>
      </form>
    </div>
  );
};

export { AddMilestone, EditMilestone };