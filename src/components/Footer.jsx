import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold uppercase"> Niarobi Apartments </h3>
            <p className="text-gray-400">Find your perfect home</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
          <p>&copy; 2024 Niarobi Apartments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;