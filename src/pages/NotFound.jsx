import React from 'react';
import { Link } from 'react-router-dom';
import { GiAmethyst } from "react-icons/gi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center px-4 py-8">
      {/* <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-xl font-extrabold uppercase mb-12"
      >
        <GiAmethyst className='text-2xl' />
        Niarobi Apartments
      </Link> */}

      {/* Main Content */}
      <div className="text-center max-w-lg">
        {/* Error Number with decorative elements */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-dark/10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-dark">404</div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-dark mb-2">
          Oops! Lost your way?
        </h1>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for seems to be missing. 
        </p>

        {/* Action Buttons */}
        <div className="w-full text-nowrap flex flex-col sm:flex-row gap-2.5 justify-center mb-12">
          <Link 
            to="/" 
            className="btn"
          >
            Back to Home
          </Link>
          <Link 
            to="/explore" 
            className="btn-tertiary"
          >
            Browse Properties
          </Link>
        </div>

        {/* Decorative Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-light px-4 text-gray-500">Quick Links</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { path: '/about', label: 'About' },
            { path: '/services', label: 'Services' },
            { path: '/contact', label: 'Contact' },
            { path: '/privacy', label: 'Privacy' }
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-600 hover:text-dark transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;