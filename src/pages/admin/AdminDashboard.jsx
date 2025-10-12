import React from 'react';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Admin Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
          <p className="text-gray-600">Registered users</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Properties</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
          <p className="text-gray-600">Listed properties</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">0</p>
          <p className="text-gray-600">Pending approvals</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">$0</p>
          <p className="text-gray-600">Total revenue</p>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Admin Actions</h3>
        <div className="flex gap-4 flex-wrap">
          <button className="btn">Manage Users</button>
          <button className="btn">Manage Properties</button>
          <button className="btn-secondary">View Reports</button>
          <button className="btn-tertiary">System Settings</button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Recent Users</h4>
            <p className="text-gray-600">No recent users</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recent Properties</h4>
            <p className="text-gray-600">No recent properties</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;