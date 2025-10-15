// contexts/FavoritesContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch user's favorites
  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/favorites`, {
        withCredentials: true
      });
      setFavorites(response.data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  // Add property to favorites
  const addFavorite = async (propertyId) => {
    if (!user) {
      alert('Please sign in to save properties');
      return false;
    }

    try {
      const response = await axios.post(`${API_URL}/favorites/${propertyId}`, {}, {
        withCredentials: true
      });
      setFavorites(response.data.favorites);
      return true;
    } catch (error) {
      console.error('Failed to add favorite:', error);
      alert('Failed to save property');
      return false;
    }
  };

  // Remove property from favorites
  const removeFavorite = async (propertyId) => {
    try {
      const response = await axios.delete(`${API_URL}/favorites/${propertyId}`, {
        withCredentials: true
      });
      setFavorites(response.data.favorites);
      return true;
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      alert('Failed to remove property from favorites');
      return false;
    }
  };

  // Check if property is in favorites
  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav._id === propertyId);
  };

  // Toggle favorite status
  const toggleFavorite = async (propertyId) => {
    if (isFavorite(propertyId)) {
      return await removeFavorite(propertyId);
    } else {
      return await addFavorite(propertyId);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  return (
    <FavoritesContext.Provider value={{
      favorites,
      loading,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      fetchFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;