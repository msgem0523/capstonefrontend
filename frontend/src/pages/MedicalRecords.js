import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MedicalRecords = () => {
  const { id } = useParams();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [milestoneLogs, setMilestoneLogs] = useState([]);
  const [vaccineLogs, setVaccineLogs] = useState([]);
  const [newRecord, setNewRecord] = useState('');
  const [newMilestone, setNewMilestone] = useState('');
  const [newVaccine, setNewVaccine] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const medicalResponse = await axios.get(`http://localhost:5000/api/children/${id}/medical-records`);
        const milestoneResponse = await axios.get(`http://localhost:5000/api/children/${id}/milestones`);
        const vaccineResponse = await axios.get(`http://localhost:5000/api/children/${id}/vaccines`);
        setMedicalRecords(medicalResponse.data);
        setMilestoneLogs(milestoneResponse.data);
        setVaccineLogs(vaccineResponse.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [id]);

  const handleAddRecord = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/children/${id}/medical-records`, { record: newRecord });
      setMedicalRecords([...medicalRecords, response.data]);
      setNewRecord('');
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleAddMilestone = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/children/${id}/milestones`, { milestone: newMilestone });
      setMilestoneLogs([...milestoneLogs, response.data]);
      setNewMilestone('');
    } catch (error) {
      console.error('Error adding milestone:', error);
    }
  };

  const handleAddVaccine = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/children/${id}/vaccines`, { vaccine: newVaccine });
      setVaccineLogs([...vaccineLogs, response.data]);
      setNewVaccine('');
    } catch (error) {
      console.error('Error adding vaccine:', error);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(`http://localhost:5000/api/children/${id}/medical-records/${recordId}`);
      setMedicalRecords(medicalRecords.filter(record => record._id !== recordId));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleDeleteMilestone = async (milestoneId) => {
    try {
      await axios.delete(`http://localhost:5000/api/children/${id}/milestones/${milestoneId}`);
      setMilestoneLogs(milestoneLogs.filter(milestone => milestone._id !== milestoneId));
    } catch (error) {
      console.error('Error deleting milestone:', error);
    }
  };

  const handleDeleteVaccine = async (vaccineId) => {
    try {
      await axios.delete(`http://localhost:5000/api/children/${id}/vaccines/${vaccineId}`);
      setVaccineLogs(vaccineLogs.filter(vaccine => vaccine._id !== vaccineId));
    } catch (error) {
      console.error('Error deleting vaccine:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Medical Records</h1>
      <div>
        <h2 className="text-lg font-bold">Add Medical Record</h2>
        <input
          type="text"
          value={newRecord}
          onChange={(e) => setNewRecord(e.target.value)}
          placeholder="New Medical Record"
        />
        <button onClick={handleAddRecord} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">Add</button>
      </div>
      <ul className="mt-4">
        {medicalRecords.map(record => (
          <li key={record._id} className="border p-2 my-2 rounded">
            {record.record}
            <button onClick={() => handleDeleteRecord(record._id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <h2 className="text-lg font-bold">Add Milestone</h2>
        <input
          type="text"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
          placeholder="New Milestone"
        />
        <button onClick={handleAddMilestone} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">Add</button>
      </div>
      <ul className="mt-4">
        {milestoneLogs.map(milestone => (
          <li key={milestone._id} className="border p-2 my-2 rounded">
            {milestone.milestone}
            <button onClick={() => handleDeleteMilestone(milestone._id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <h2 className="text-lg font-bold">Add Vaccine</h2>
        <input
          type="text"
          value={newVaccine}
          onChange={(e) => setNewVaccine(e.target.value)}
          placeholder="New Vaccine"
        />
        <button onClick={handleAddVaccine} className="ml-2 px-4 py-2 bg-green-500 text-white rounded">Add</button>
      </div>
      <ul className="mt-4">
        {vaccineLogs.map(vaccine => (
          <li key={vaccine._id} className="border p-2 my-2 rounded">
            {vaccine.vaccine}
            <button onClick={() => handleDeleteVaccine(vaccine._id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecords;