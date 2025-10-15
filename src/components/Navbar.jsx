import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiAmethyst } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get user from localStorage
  // const user = JSON.parse(localStorage.getItem('user'));
   const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
        withCredentials: true
      });
      localStorage.removeItem('user');
      setIsMenuOpen(false);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full h-16 border-b border-dark/10 bg-white sticky top-0 z-50">
      <div className='container h-full flex items-center justify-between relative bg-light z-2'>
        <Link to="/" onClick={() => { window.scrollTo(0,0); closeMenu(); }} className="text-base font-extrabold uppercase flex items-center gap-2"> 
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
          
          {/* Conditional rendering based on auth */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* <span className="text-dark/80">Welcome, {user.username}!</span> */}
              <Link 
                to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                className="btn"
              >
                {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
              </Link>
              {/* <button 
                onClick={handleLogout}
                className="btn-tertiary"
              >
                Logout
              </button> */}
            </div>
          ) : (
            <Link to="/login" className="btn">Sign In</Link>
          )}
        </ul>

        {/* Mobile menu button */}
        <button className="md:hidden text-2xl cursor-pointer" onClick={() => setIsMenuOpen(prev => !prev)}>
          {isMenuOpen ? <RiCloseLargeLine /> : <RxHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul className={`z-1 relative w-full md:hidden flex flex-col items-start space-y-4 p-4 bg-white border-t border-gray-200 transition-all duration-400 ${isMenuOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-20 opacity-0 pointer-events-none" }`}>
        <Link to="/" onClick={closeMenu} className="text-dark hover:text-dark/60 w-full">Home</Link>
        <Link to="/explore" onClick={closeMenu} className="text-dark hover:text-dark/60 w-full">Explore</Link>
        <Link to="/about" onClick={closeMenu} className="text-dark hover:text-dark/60 w-full">About</Link>
        <Link to="/contact" onClick={closeMenu} className="text-dark hover:text-dark/60 w-full">Contact</Link>
        <Link to="/services" onClick={closeMenu} className="text-dark hover:text-dark/60 w-full">Services</Link>
        
        {/* Conditional mobile menu based on auth */}
        {user ? (
          <>
            <div className="w-full pt-2 border-t border-gray-200">
              <p className="text-dark/80 mb-2">Welcome, {user.username}!</p>
              <Link 
                to={user.role === 'admin' ? '/admin' : '/user'} 
                onClick={closeMenu}
                className="block w-full text-center btn mb-2"
              >
                {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="block w-full text-center btn-tertiary"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link to="/login" onClick={closeMenu} className="btn w-full text-center">Sign In</Link>
        )}
      </ul>

      {/* Mobile menu overlay */}
      {isMenuOpen && ( 
        <div onClick={closeMenu} className='z-0 fixed inset-0 bg-dark/80 backdrop-blur-xs cursor-pointer'></div>
      )} 
    </nav>
  )
}

export default Navbar;