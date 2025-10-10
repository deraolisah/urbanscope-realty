// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6"> About Niarobi Apartments </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        We are dedicated to helping you find your perfect home with over 1,000 apartments 
        available across the city. Our experienced agents are committed to providing 
        exceptional service.
      </p>

      {/* About Apartment Section */}
      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
        <h2 className="font-bold text-2xl mb-4">About apartment</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Experience modern living with
          luxurious amenities and convenient access to city life.
        </p>
      </div>
    </div>
  );
};

export default About;