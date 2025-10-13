import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdPersonAdd, MdDelete, MdEdit } from 'react-icons/md';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAgents: 0,
    totalProperties: 0,
    totalAdmins: 0
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, propertiesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/users`, { 
          withCredentials: true 
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/properties`)
      ]);

      setUsers(usersRes.data.users);
      setProperties(propertiesRes.data);

      // Calculate stats
      const totalUsers = usersRes.data.users.length;
      const totalAgents = usersRes.data.users.filter(u => u.role === 'agent').length;
      const totalAdmins = usersRes.data.users.filter(u => u.role === 'admin').length;
      
      setStats({
        totalUsers,
        totalAgents,
        totalProperties: propertiesRes.data.length,
        totalAdmins
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

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

  const handleCreateAgent = () => {
    navigate('/admin/create-agent');
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          { withCredentials: true }
        );
        fetchDashboardData(); // Refresh data
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        { isActive: !currentStatus },
        { withCredentials: true }
      );
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            Admin Dashboard
            <span className="text-sm font-normal ml-2 bg-red-100 text-red-800 px-2 py-1 rounded">
              {user?.role}
            </span>
          </h2>
          <p className="text-gray-600">System administration panel</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleCreateAgent}
            className="btn flex items-center gap-2"
          >
            <MdPersonAdd /> Create Agent
          </button>
          <button onClick={handleLogout} className="btn-tertiary">
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          <p className="text-gray-600">Registered users</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Agents</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalAgents}</p>
          <p className="text-gray-600">Active agents</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Properties</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalProperties}</p>
          <p className="text-gray-600">Listed properties</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Admins</h3>
          <p className="text-3xl font-bold text-red-600">{stats.totalAdmins}</p>
          <p className="text-gray-600">System administrators</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Users Management */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">User Management</h3>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {users.map((user) => (
              <div key={user._id} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{user.username}</h4>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'agent' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleUserStatus(user._id, user.isActive)}
                    className={`px-3 py-1 rounded text-sm ${
                      user.isActive ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    disabled={user._id === JSON.parse(localStorage.getItem('user')).id}
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Properties */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">Recent Properties</h3>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {properties.slice(0, 5).map((property) => (
              <div key={property._id} className="p-4">
                <h4 className="font-semibold">{property.title}</h4>
                <p className="text-gray-600 text-sm">{property.location}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">${property.price.toLocaleString()}</span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {property.propertyType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;