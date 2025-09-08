import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import Orders from '../components/dashboard/Orders';
import Profile from '../components/dashboard/Profile';
import Support from '../components/dashboard/Support';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="support" element={<Support />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
