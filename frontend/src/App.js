import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfiles from './pages/UserProfiles';
import ChildProfiles from './pages/ChildProfiles';
import MedicalRecords from './pages/MedicalRecords';
import MilestoneLog from './pages/MilestoneLog';
import VaccineLog from './pages/VaccineLog';
import Navbar from './components/Navbar';
import AddChild from './pages/AddChild';
import EditChild from './pages/EditChild';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import SelectedUser from './pages/SelectedUser';
import SelectedChild from './pages/SelectedChild';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userprofiles" element={<UserProfiles />} />
          <Route path="/child" element={<ChildProfiles />} />
          <Route path="/add-child" element={<AddChild />} />
          <Route path="/edit-child/:id" element={<EditChild />} />
          <Route path="/medicalrecords" element={<MedicalRecords />} />
          <Route path="/milestones" element={<MilestoneLog />} />
          <Route path="/vaccines" element={<VaccineLog />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/user/:id" element={<SelectedUser />} />
          <Route path="/child/:id" element={<SelectedChild />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
