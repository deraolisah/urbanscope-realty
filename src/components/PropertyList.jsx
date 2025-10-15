import React, { useContext } from 'react';
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { FavoritesContext } from "../contexts/FavoritesContext";

const PropertyList = ({ property }) => {

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleFavorite(property._id);
  };

  return (
    <div className='w-full flex items-center hover:shadow-md rounded-sm overflow-hidden bg-light'>
      <Link to={`/property/${property._id}`} className='w-fit'>
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover aspect-8/10 md:aspect-5/4" />
      </Link>
      <div className='p-4 py-3 w-full space-y-1'>
        <div className='w-full flex items-center justify-between'>
          <h3 className="text-lg font-extrabold"> 
            ${property.price}<span className='text-dark/80 text-sm font-normal'> /month</span> 
          </h3>
          <button className={`btn-secondary p-1 rounded-full ${isFavorite(property._id) ? 'text-red-500' : ''}`}
            onClick={handleFavoriteClick}>
            {isFavorite(property._id) ? <HiHeart className="text-lg" /> : <HiOutlineHeart className="text-lg" />}
          </button>
        </div>
        <p className='text-sm uppercase font-bold'> {property.title} </p>
        <p className='text-sm text-dark/60 font-semibold'> {property.location} </p>
        <p className='text-dark/80 text-xs mt-2'> {property.description.slice(0,100) + "..."} </p>
      </div>
    </div>
  )
}


export default PropertyList;