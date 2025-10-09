import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { GiAmethyst } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full h-16 border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className='container h-full flex items-center justify-between relative bg-light z-2'>
        <Link to={"/"} onClick={() => { scrollTo(0,0)}} className="text-base font-extrabold uppercase flex items-center gap-2"> 
          <GiAmethyst className='text-xl -mt-0.5' />
          Niarobi Apartments
        </Link>

        <ul className='hidden md:flex items-center space-x-8'>
          <Link to="/" className={`relative text-dark/80 hover:text-dark transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-dark after:transition-all after:duration-300 hover:after:w-full ${ location.pathname === '/' ? 'text-dark font-semibold after:w-full' : '' }`}>
            Home
          </Link>
          <Link to="/explore" className={`relative text-dark/80 hover:text-dark transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-dark after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/explore' ? 'text-dark font-semibold after:w-full' : ''}`}> Explore </Link>
          <Link to="/about" className={`relative text-dark/80 hover:text-dark transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-dark after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/about' ? 'text-dark font-semibold after:w-full' : ''}`}> About </Link>
          <Link to="/contact" className={`relative text-dark/80 hover:text-dark transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-dark after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/contact' ? 'text-dark font-semibold after:w-full' : ''}`}> Contact </Link>
          <Link to="/services" className={`relative text-dark/80 hover:text-dark transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-dark after:transition-all after:duration-300 hover:after:w-full ${location.pathname === '/services' ? 'text-dark font-semibold after:w-full' : ''}`}> Services </Link>
          <button className="btn">Sign In</button>
        </ul>

        {/* Mobile menu button */}
        <button className="md:hidden text-2xl cursor-pointer" onClick={() => setIsMenuOpen(prev => !prev)}>
          {isMenuOpen ? (
            <RiCloseLargeLine />
          ) : (
            <RxHamburgerMenu /> 
          )
          }
        </button>
      </div>

        <ul className={`z-1 relative md:hidden flex flex-col items-start space-y-4 p-4 bg-white border-t border-gray-200 transition-all duration-400 ${isMenuOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-20 opacity-0 pointer-events-none" }`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-dark">Home</Link>
          <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="text-dark">Explore</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-dark">About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-dark">Contact</Link>
          <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-dark">Services</Link>
          <button className="btn">Sign In</button>
        </ul>
      {isMenuOpen && ( <div className='z-0 fixed inset-0 bg-dark/80 backdrop-blur-xs'></div>)} 
    </nav>
  )
}

export default Navbar;