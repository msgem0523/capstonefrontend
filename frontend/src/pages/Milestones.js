import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

// AddMilestone Component
const AddMilestone = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [milestoneData, setMilestoneData] = useState({
    date: '',
    category: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilestoneData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    try {
      if (!childId) {
        console.error('No child selected');
        return;
      }

      console.log('Form data:', milestoneData); // Debugging log
      const response = await axios.post(`http://localhost:5000/api/children/${childId}/milestones`, milestoneData);
      console.log('Response data:', response.data); // Debugging log
      alert('Milestone added successfully!');
      navigate(`/childprofiles/view/${childId}`);
    } catch (error) {
      console.error('Error adding milestone:', error); // Debugging log
      alert('Error adding milestone');
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-xl font-bold">Add Milestone</h1>
      <form onSubmit={handleAddMilestone}>
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
          <label>Category:</label>
          <select
            name="category"
            value={milestoneData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Physical">Physical</option>
            <option value="Cognitive">Cognitive</option>
            <option value="Social">Social</option>
            <option value="Emotional">Emotional</option>
            <option value="Language">Language</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={milestoneData.description}
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
    category: '',
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

  const handleUpdateMilestone = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/milestones/${milestoneId}`, milestoneData);
      console.log('Response data:', response.data); // Debugging log
      alert('Milestone updated successfully!');
      navigate(`/childprofiles/view/${response.data.childId}`);
    } catch (error) {
      console.error('Error updating milestone:', error); // Debugging log
      alert('Error updating milestone');
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-xl font-bold">Edit Milestone</h1>
      <form onSubmit={handleUpdateMilestone}>
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
          <label>Category:</label>
          <select
            name="category"
            value={milestoneData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Physical">Physical</option>
            <option value="Cognitive">Cognitive</option>
            <option value="Social">Social</option>
            <option value="Emotional">Emotional</option>
            <option value="Language">Language</option>
          </select>
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