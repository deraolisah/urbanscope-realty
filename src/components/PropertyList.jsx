import React, { useContext } from 'react';
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { FavoritesContext } from "../contexts/FavoritesContext";
import { PropertyContext } from '../contexts/PropertyContext';
import { LiaBedSolid } from "react-icons/lia";
import { LiaBathSolid } from "react-icons/lia";

const PropertyList = ({ property }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { getFormattedPrice } = useContext(PropertyContext);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleFavorite(property._id);
  };

  const priceInfo = getFormattedPrice(property);

  return (
    <div className='w-full flex items-center hover:shadow-md rounded-sm overflow-hidden bg-light relative'>
      {/* Transaction Type Badge */}
      <div className={`absolute top-2 left-2 z-10 px-2 py-1 rounded text-xs font-semibold pointer-events-none ${priceInfo.badge}`}>
        {priceInfo.transactionType}
      </div>
      <Link to={`/property/${property._id}`} className='w-fit'>
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover aspect-8/10 md:aspect-5/4" />
      </Link>
      <div className='p-4 py-3 w-full space-y-1.5'>
        <div className='w-full flex items-center justify-between'>
          <h3 className="text-lg font-extrabold"> 
            {priceInfo.formatted}
            {priceInfo.suffix && (
              <span className='text-dark/80 text-sm font-normal'> {priceInfo.suffix} </span>
            )}
          </h3>
          <button className={`btn-secondary p-1 rounded-full ${isFavorite(property._id) ? 'text-red-500' : ''}`}
            onClick={handleFavoriteClick}>
            {isFavorite(property._id) ? <HiHeart className="text-lg" /> : <HiOutlineHeart className="text-lg" />}
          </button>
        </div>
        <p className='text-sm uppercase font-bold'> {property.title} </p>
        <p className='text-sm text-dark/60 font-semibold'> {property.location} </p>
        <p className='text-dark/80 text-xs mt-2 hidden sm:flex'> {property.description.slice(0,60) + "..."} </p>
        <p className='space-x-2 text-dark/80 flex items-center'>
          <span className='text-sm flex items-center gap-2'> {property.bedrooms} beds <LiaBedSolid /> </span>
          <span> • </span>
          <span className='text-sm flex items-center gap-2'> {property.bathrooms} baths <LiaBathSolid /> </span>
        </p>
      </div>
    </div>
  );
}

export default PropertyList;