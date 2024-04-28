import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  // Assuming you might want to do more than just redirect, use a condition or additional logic
  return <Navigate to="/admin" replace />;
};

export default Dashboard;
