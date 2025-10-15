// pages/public/Favorites.js
import React, { useContext } from 'react';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import PropertyCard from '../../components/PropertyCard';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { favorites, loading } = useContext(FavoritesContext);

  const navigate = useNavigate();

  if (loading) {
    return <div className="container py-8 text-center">Loading favorites...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6"> My Favorite Properties </h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl mb-4">No favorite properties yet</div>
          <p className="text-gray-400 mb-6">Start exploring and save properties you love!</p>
          <button 
            onClick={() => navigate('/explore')}
            className="btn"
          >
            Explore Properties
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;