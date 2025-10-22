import React from 'react';
import logo from "../assets/logo-white.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="mb-4 md:mb-0">
            <Link to="/" onClick={() => { window.scrollTo(0,0); closeMenu(); }} className=""> 
              <img src={logo} alt='UrbanScope Logo' className='h-8' />
            </Link>
            <p className="text-gray-400 mt-4">Find your perfect home</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-light/80 text-light/40 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-light/80 text-light/40 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-light/80 text-light/40 transition-colors">Contact Us</Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 UrbanScope Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;