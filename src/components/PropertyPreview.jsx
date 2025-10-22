import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniArrowRight } from "react-icons/hi2";
import { PropertyContext } from '../contexts/PropertyContext';

const PropertyPreview = ({ property }) => {
  const { getFormattedPrice } = useContext(PropertyContext);
  const priceInfo = getFormattedPrice(property);

  return (
    <div className="bg-dark/5 w-full hover:bg-dark/10 hover:shadow-md transition-colors duration-200 rounded-lg m-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start md:h-[320px] gap-0">
        <div className="flex flex-col items-start justify-between space-y-2 h-full w-full md:max-w-md p-4 md:p-6 overflow-hidden">
          <div className='space-y-1 w-full'>
            <h3 className="font-bold text-base md:text-xl uppercase whitespace-nowrap overflow-hidden text-ellipsis w-full">{property.title}</h3>
              
            <p className="font-medium text-xs"> {property.location} </p>
            <p className="text-gray-600 text-sm"> {property.description.slice(0,68) + "..."} </p>
            {property.price && (
              <p className="text-xl md:text-3xl font-extrabold mt-2"> 
                {priceInfo.formatted}
                {priceInfo.suffix && (
                  <span className='text-dark/80 font-normal text-base'>{priceInfo.suffix}</span>
                )}
              </p>
            )}
          </div>
          <Link to={`/property/${property._id}`}className="hidden md:flex btn" onClick={() => { scrollTo(0,0)}}>
            View details 
            <HiMiniArrowRight />
          </Link>
        </div>

        {property.images && (
          <Link to={`/property/${property._id}`} className="w-full h-full bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PropertyPreview;