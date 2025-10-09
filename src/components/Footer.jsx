import React from 'react';

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
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a>
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