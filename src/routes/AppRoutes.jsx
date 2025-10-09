import React from 'react';
import { Routes, Route } from "react-router-dom";
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Explore from '../pages/Explore';
import Services from '../pages/Services';
import PropertyDetail from '../pages/PropertyDetail';

const AppRoutes = () => {
  return (
    <div className='font-body bg-light text-dark'>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/services' element={<Services />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes;