// import React from 'react';
// import logo from "../assets/logo-white.png";
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="text-white">
//       {/* Top Section */}
//       {/* <div className="bg-red-600 py-6 px-4 md:px-10 flex flex-col md:flex-row justify-between items-start text-sm font-medium">
//         <div>
//           <p>YEAR FOUNDED</p>
//           <p className="text-white font-bold">2014</p>
//         </div>
//         <div>
//           <p>LOCATION</p>
//           <p className="text-white font-bold">Berlin, Germany</p>
//         </div>
//       </div> */}

//       {/* Bottom Section */}
//       <div className="bg-black py-16 px-4 md:px-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
//           {/* Logo */}
//           <div className="mb-2 md:mb-0">
//             <Link to="/" onClick={() => { window.scrollTo(0,0); closeMenu(); }} className=""> 
//               <img src={logo} alt='UrbanScope Logo' className='h-8' />
//             </Link>
//             {/* <p className="text-gray-400 mt-4"> Find your perfect home </p> */}
//             <p className="text-gray-300 mt-4"> Empowering home seekers with smart insights to find the perfect property and elevate their living experience. </p>
//           </div>

          
//           {/* Get in Touch */}
//           <div>
//             <h4 className="text-lg font-semibold mb-1 md:mb-2"> Get in touch </h4>
//             <p className='text-gray-300 mb-1'> business@urbanscope.com </p>
//             <p className='text-gray-300 mb-1'> +1-(902)-2330-456 </p>
//             <p className='text-gray-300 mb-1'><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn </a></p>
//             <p className='text-gray-300'><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram </a></p>
//             {/* <p> hello@piazzapizza.io </p> */}
//           </div>

//           {/* Connect */}
//           <div>
//             <h4 className="text-lg font-semibold mb-1 md:mb-2"> Connect </h4>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="text-lg font-semibold mb-1 md:mb-2"> Services </h4>
//             <p className='text-gray-300 mb-1'> Land Acquisitions </p>
//             <p className='text-gray-300 mb-1'> Shortlet Investments </p>
//             <p className='text-gray-300'> Property Inspections </p>
//           </div>

//           {/* Ventures */}
//           {/* <div>
//             <h4 className="text-lg font-semibold mb-2">Ventures</h4>
//             <p>Piazza Pizza Ventures GmbH</p>
//             <p>Dresdener Str. 22</p>
//             <p>10999 Berlin, Germany</p>
//           </div> */}
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-start text-xs text-gray-400">
//           <div className="mb-4 md:mb-0 space-y-2">
//             <p> Website Created by <a href="https://deraolisah.com/" target="_blank" className='underline'> Nathaniel </a></p>
//             <p>
//               {/* © 2022  */}
//               &copy; 2025 UrbanScope Realty. All rights reserved.
//             </p>
//           </div>
//           <div className="flex space-x-6">
//             <Link to="/privacy" className="hover:text-white transition-colors">Data Privacy</Link>
//             <Link to="/imprint" className="hover:text-white transition-colors">Imprint</Link>
//             <Link to="/profile" className="hover:text-white transition-colors"> Terms </Link>
//             {/* <Link to="/services" className="hover:text-white transition-colors">Services</Link> */}
//             {/* <Link to="/work" className="hover:text-white transition-colors">Work</Link> */}
//             <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import logo from "../assets/logo-white.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white">
      {/* Main Footer Content */}
      <div className="bg-black py-16 px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" onClick={() => { window.scrollTo(0,0); }} className=""> 
              <img src={logo} alt='UrbanScope Logo' className='h-8' />
            </Link>
            <p className="text-gray-300 mt-4 mb-6"> 
              Empowering home seekers with smart insights to find the perfect property and elevate their living experience. 
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors">
                <span className="sr-only">Facebook</span>
                {/* Add your icon here */}
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors">
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors">
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/explore" className="hover:text-white transition-colors">Browse Properties</Link></li>
              <li><Link to="/agents" className="hover:text-white transition-colors">Our Agents</Link></li>
              <li><Link to="/neighborhoods" className="hover:text-white transition-colors">Neighborhoods</Link></li>
              <li><Link to="/market-reports" className="hover:text-white transition-colors">Market Reports</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/buy" className="hover:text-white transition-colors">Buy a Home</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell a Home</Link></li>
              <li><Link to="/rent" className="hover:text-white transition-colors">Rentals</Link></li>
              <li className="text-gray-300">Land Acquisitions</li>
              <li className="text-gray-300">Shortlet Investments</li>
              <li className="text-gray-300">Property Inspections</li>
              <li><Link to="/valuation" className="hover:text-white transition-colors">Property Valuation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-gray-300">
              <div>
                <p className="font-medium text-white">Email</p>
                <a href="mailto:business@urbanscope.com" className="hover:text-white transition-colors">business@urbanscope.com</a>
              </div>
              <div>
                <p className="font-medium text-white">Phone</p>
                <a href="tel:+234-902-2330-456" className="hover:text-white transition-colors"> +(234) 902 - 233 - 0456 </a>
              </div>
              <div>
                <p className="font-medium text-white">Office Hours</p>
                <p>Mon-Fri: 9AM-6PM</p>
                <p>Sat: 10AM-4PM</p>
              </div>
              <div>
                <p className="font-medium text-white">Address</p>
                <p>123 Property Lane<br /> Lagos, Nigeria. 10115</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-start text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>
              &copy; 2025 UrbanScope Realty. All rights reserved.
            </p>
            <p className="mt-1 text-xs">
              Website by <a href="https://deraolisah.com/" target="_blank" rel="noopener noreferrer" className='underline hover:text-white'>Nathaniel</a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;