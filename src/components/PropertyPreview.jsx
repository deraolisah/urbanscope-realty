import React from 'react';
import { Link } from 'react-router-dom';
import { HiMiniArrowRight } from "react-icons/hi2";

const PropertyPreview = ({ property, showMore = true }) => {
  return (
    <div className="bg-dark/5 hover:bg-dark/10 hover:shadow-md transition-colors duration-200 rounded-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start md:h-[400px] gap-0">
        <div className="flex flex-col items-start justify-between space-y-2 h-full w-full md:max-w-md p-4">
          <div className='space-y-1'>
            <h3 className="font-bold text-lg md:text-xl uppercase">{property.title}</h3>
              
            <p className="font-medium"> {property.location} </p>
            <p className="text-gray-600"> {property.description} </p>
            {property.price && (
              <p className="text-3xl font-extrabold mt-2"> ${property.price}<span className='text-dark/80 font-normal text-base'>/month</span></p>
            )}
          </div>
          {showMore && (
            <Link
            to={`/property/${property._id}`}
            className="btn"
            onClick={() => { scrollTo(0,0)}}
            >
              View details 
              <HiMiniArrowRight />
              {/* → */}
            </Link>
          )}
        </div>

        {property.images && (
          <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPreview;