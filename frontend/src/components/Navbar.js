import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-3 text-white">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/userprofiles">User Profiles</Link></li>
        <li><Link to="/child">Child Profiles</Link></li>
        <li><Link to="/medicalrecords">Medical Records</Link></li>
        <li><Link to="/milestones">Milestone Log</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
