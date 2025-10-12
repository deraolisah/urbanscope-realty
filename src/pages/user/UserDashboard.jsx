import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

   const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        withCredentials: true
      });
      localStorage.removeItem('user');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-6">User Dashboard</h1> */}
      <h2 className="text-2xl font-bold mb-8 "> Welcome back, {user.username.toUpperCase()} </h2>

      <button onClick={handleLogout} className="btn-tertiary w-fit"> Logout </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">My Properties</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
          <p className="text-gray-600">Properties listed</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Favorites</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
          <p className="text-gray-600">Saved properties</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Inquiries</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
          <p className="text-gray-600">Pending inquiries</p>
        </div>
      </div>

      {/* User Actions */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="btn">Add Property</button>
          <button className="btn-secondary">View My Listings</button>
          <button className="btn-tertiary">Edit Profile</button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-600">No recent activity</p>
      </div>
    </div>
  );
};

export default UserDashboard;