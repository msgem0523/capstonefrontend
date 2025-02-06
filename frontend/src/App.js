import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import ChildProfilePage from './pages/ChildProfilePage';
import { AddUser, EditUser } from './pages/UserProfiles';
import { AddChild, EditChild } from './pages/ChildProfiles';
import { AddMedicalRecord, EditMedicalRecord } from './pages/MedicalRecords';
import { AddMilestone, EditMilestone } from './pages/Milestones';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userprofiles/view/:userId" element={<UserProfilePage />} />
        <Route path="/userprofiles/:userId/add-child" element={<AddChild />} />
        <Route path="/userprofiles/edit/:userId" element={<EditUser />} />
        <Route path="/childprofiles/view/:childId" element={<ChildProfilePage />} />
        <Route path="/childprofiles/edit/:childId" element={<EditChild />} />
        <Route path="/childprofiles/:childId/add-medical-record" element={<AddMedicalRecord />} />
        <Route path="/medicalrecords/edit/:recordId" element={<EditMedicalRecord />} />
        <Route path="/childprofiles/:childId/add-milestone" element={<AddMilestone />} />
        <Route path="/milestones/edit/:milestoneId" element={<EditMilestone />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
};

export default App;
