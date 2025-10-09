import React from 'react';
import { Routes, Route } from "react-router-dom";

import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Explore from '../pages/Explore';
import Services from '../pages/Services';
import PropertyDetail from '../pages/PropertyDetail';


import Login from '../pages/auth/Login';


import DashboardLayout from '../layouts/DashboardLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';


const AppRoutes = () => {
  return (
    <div className='font-body bg-light text-dark'>
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route index path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/services' element={<Services />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Route>

        {/* AUTH */}
        <Route path='login' element={<Login />} />
          


        {/* ADMIN */}
        <Route element={<DashboardLayout />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes;