import React from 'react';
import logo from "../assets/logo-white.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white">
      {/* Top Section */}
      {/* <div className="bg-red-600 py-6 px-4 md:px-10 flex flex-col md:flex-row justify-between items-start text-sm font-medium">
        <div>
          <p>YEAR FOUNDED</p>
          <p className="text-white font-bold">2014</p>
        </div>
        <div>
          <p>LOCATION</p>
          <p className="text-white font-bold">Berlin, Germany</p>
        </div>
      </div> */}

      {/* Bottom Section */}
      <div className="bg-black py-16 px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Logo */}
          <div className="mb-2 md:mb-0">
            <Link to="/" onClick={() => { window.scrollTo(0,0); closeMenu(); }} className=""> 
              <img src={logo} alt='UrbanScope Logo' className='h-8' />
            </Link>
            {/* <p className="text-gray-400 mt-4"> Find your perfect home </p> */}
            <p className="text-gray-300 mt-4"> Empowering home seekers with smart insights to find the perfect property and elevate their living experience. </p>
          </div>

          
          {/* Get in Touch */}
          <div>
            <h4 className="text-lg font-semibold mb-1 md:mb-2"> Get in touch </h4>
            <p className='text-gray-300 mb-1'> business@urbanscope.com </p>
            <p className='text-gray-300'> +1-(902)-2330-456 </p>
            {/* <p> hello@piazzapizza.io </p> */}
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-1 md:mb-2"> Connect </h4>
            <p className='text-gray-300 mb-1'><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn </a></p>
            <p className='text-gray-300'><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram </a></p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-1 md:mb-2"> Services </h4>
            <p className='text-gray-300 mb-1'> Piazza Pizza Design Services GmbH </p>
            <p className='text-gray-300 mb-1'> Dresdener Str. 22 </p>
            <p className='text-gray-300'> 10999 Berlin, Germany </p>
          </div>

          {/* Ventures */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-2">Ventures</h4>
            <p>Piazza Pizza Ventures GmbH</p>
            <p>Dresdener Str. 22</p>
            <p>10999 Berlin, Germany</p>
          </div> */}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-start text-xs text-gray-400">
          <div className="mb-4 md:mb-0 space-y-2">
            <p> Website Created by <a href="https://deraolisah.com/" target="_blank" className='underline'> Nathaniel </a></p>
            <p>
              {/* © 2022  */}
              &copy; 2025 UrbanScope Realty. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Data Privacy</Link>
            <Link to="/imprint" className="hover:text-white transition-colors">Imprint</Link>
            <Link to="/profile" className="hover:text-white transition-colors"> Terms </Link>
            {/* <Link to="/services" className="hover:text-white transition-colors">Services</Link> */}
            {/* <Link to="/work" className="hover:text-white transition-colors">Work</Link> */}
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;