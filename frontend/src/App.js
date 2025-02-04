import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfiles from './pages/UserProfiles';
import ChildProfiles from './pages/ChildProfiles';
import MedicalRecords from './pages/MedicalRecords';
import MilestoneLog from './pages/MilestoneLog';
import VaccineLog from './pages/VaccineLog';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userprofiles/:action/:userId?" element={<UserProfiles />} />
          <Route path="/childprofiles/:action/:userId?/:childId?" element={<ChildProfiles />} />
          <Route path="/medicalrecords" element={<MedicalRecords />} />
          <Route path="/milestones" element={<MilestoneLog />} />
          <Route path="/vaccines" element={<VaccineLog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
