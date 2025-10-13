import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    featured: 0
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    fetchAgentProperties();
  }, []);

  const fetchAgentProperties = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/properties/agent/my-properties`,
        { withCredentials: true }
      );
      setProperties(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const active = response.data.filter(p => p.status === 'active').length;
      const featured = response.data.filter(p => p.featured).length;
      
      setStats({ total, active, featured });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
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

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/properties/${propertyId}`,
          { withCredentials: true }
        );
        fetchAgentProperties(); // Refresh the list
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property');
      }
    }
  };

  if (loading) {
    return <div className="p-6">Loading your properties...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            Agent Dashboard
            <span className="text-sm font-normal ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">
              {user?.role}
            </span>
          </h2>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/agent/add-property')}
            className="btn flex items-center gap-2"
          >
            <MdAdd /> Add Property
          </button>
          <button onClick={handleLogout} className="btn-tertiary">
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Properties</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-gray-600">All listings</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Active</h3>
          <p className="text-3xl font-bold text-green-600">{stats.active}</p>
          <p className="text-gray-600">Available properties</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Featured</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.featured}</p>
          <p className="text-gray-600">Featured listings</p>
        </div>
      </div>

      {/* Properties List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">My Properties</h3>
        </div>
        
        {properties.length > 0 ? (
          <div className="divide-y">
            {properties.map((property) => (
              <div key={property._id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {property.images && property.images.length > 0 ? (
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  )}
                  <div>
                    <h4 className="font-semibold">{property.title}</h4>
                    <p className="text-gray-600">{property.location}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        ${property.price.toLocaleString()}
                      </span>
                      <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {property.propertyType}
                      </span>
                      {property.featured && (
                        <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/agent/edit-property/${property._id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Edit"
                  >
                    <MdEdit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteProperty(property._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No Properties Listed</h3>
            <p className="text-gray-600 mb-6">Start by adding your first property listing</p>
            <button 
              onClick={() => navigate('/agent/add-property')}
              className="btn flex items-center gap-2 mx-auto"
            >
              <MdAdd /> Add Your First Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;