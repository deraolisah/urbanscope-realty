import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdPersonAdd, MdDelete, MdEdit, MdAdd } from 'react-icons/md';
import { PropertyContext } from "../../contexts/PropertyContext";
import { AuthContext } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAgents: 0,
    totalProperties: 0,
    totalAdmins: 0
  });

  const { user, logout } = useContext(AuthContext);
  const { properties, loading, setLoading, getFormattedPrice } = useContext(PropertyContext);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    try {
      const usersRes = await axios.get(`${API_URL}/admin/users`);
      // Remove withCredentials: true
      
      const usersData = usersRes.data.users || usersRes.data;
      setUsers(usersData);
      
      updateStats(usersData, properties);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  // Calculate stats
  const updateStats = (usersData, propertiesData) => {
    const totalUsers = usersData.length;
    const totalAgents = usersData.filter(u => u.role === 'agent').length;
    const totalAdmins = usersData.filter(u => u.role === 'admin').length;
    
    setStats({
      totalUsers,
      totalAgents,
      totalProperties: propertiesData.length,
      totalAdmins
    });
  };

  const handleLogout = async () => {
    try {
      await logout(); // Use AuthContext logout
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Delete A User
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_URL}/admin/${userId}`);
        // Remove withCredentials: true
        fetchDashboardData(); // Refresh data
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  // Toggle User Status
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(
        `${API_URL}/admin/${userId}`,
        { isActive: !currentStatus }
        // Remove withCredentials: true
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  // Delete A Property
  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`${API_URL}/properties/${propertyId}`);
        // Remove withCredentials: true
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert(error.response?.data?.message || 'Failed to delete property');
      }
    }
  };


  if (loading) {
    return <div className="p-6"> Loading dashboard... </div>;
  }

//   if (!user) {
//   return <Navigate to="/login" replace />;
// }

  return (
    <div className="container pb-8">
      <div className="flex flex-wrap justify-between items-center gap-2 my-8">
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
          <button onClick={() => navigate('/admin/add-property')} className="btn text-nowrap gap-2">
            <MdAdd /> Add Property
          </button>
          <button onClick={handleLogout} className="btn-tertiary">
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-dark/10 p-4 md:p-6 rounded-lg shadow-md flex items-center justify-between">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-extrabold">{stats.totalUsers}</p>
        </div>
          {/* <p className="text-gray-600">Registered users</p> */}

        <div className="bg-white border border-dark/10 p-4 md:p-6 rounded-lg shadow-md flex items-center justify-between">
          <h3 className="text-lg font-semibold">Agents</h3>
          <p className="text-3xl font-extrabold">{stats.totalAgents}</p>
        </div>
          {/* <p className="text-gray-600">Active agents</p> */}

        <div className="bg-white border border-dark/10 p-4 md:p-6 rounded-lg shadow-md flex items-center justify-between">
          <h3 className="text-lg font-semibold">Properties</h3>
          <p className="text-3xl font-extrabold">{stats.totalProperties}</p>
        </div>
          {/* <p className="text-gray-600">Listed properties</p> */}

        <div className="bg-white border border-dark/10 p-4 md:p-6 rounded-lg shadow-md flex items-center justify-between">
          <h3 className="text-lg font-semibold">Admins</h3>
          <p className="text-3xl font-extrabold">{stats.totalAdmins}</p>
        </div>
          {/* <p className="text-gray-600">System administrators</p> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
        {/* Users Management */}
        <div className="bg-white border border-dark/10 rounded-lg shadow-md">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold"> User Management </h3>
            <span className="text-sm text-gray-500"> ({users.length}) users </span>
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
                    className={`px-3 py-1 rounded text-sm cursor-pointer ${
                      user.isActive ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}
                    disabled={user.role === "admin"}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  {/* <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    disabled={user._id === JSON.parse(localStorage.getItem('user')).id}
                  >
                    <MdDelete size={18} />
                  </button> */}
                  <button 
                    onClick={() => handleDeleteUser(user._id || user.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                    // disabled={user._id === user?.id || user._id === user?._id}
                    disabled={user.role === "admin"}
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Property Management */}
        <div className="bg-white border border-dark/10 rounded-lg shadow-md">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold"> Property Management </h3>
            <span className="text-sm text-gray-500"> ({properties.length}) properties</span>
          </div>

          <div className="divide-y max-h-96 overflow-y-auto">
            {properties.slice(0, 10).map((property) => {
              const priceInfo = getFormattedPrice(property);
              
              return (
                <div key={property._id} className="p-4 flex justify-between items-start group">
                  <div className="flex-1">
                    <div className='flex items-start gap-2'>
                      <img src={property.images[0]} className='w-16 h-16 rounded' />
                      <div>
                        <h4 className="font-semibold">{property.title}</h4>
                        <p className="text-gray-600 text-sm">{property.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium">
                        {priceInfo.formatted}{priceInfo.suffix}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {property.propertyType}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        property.status === 'active' ? 'bg-green-100 text-green-800' :
                        property.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                        property.status === 'rented' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status}
                      </span>
                      {property.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1 ml-4">
                    <button 
                      onClick={() => navigate(`/admin/edit-property/${property._id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer transition-colors"
                      title="Edit Property"
                    >
                      <MdEdit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProperty(property._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors"
                      title="Delete Property"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;