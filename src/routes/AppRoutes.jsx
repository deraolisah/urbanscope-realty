import React from 'react';
import { Routes, Route } from "react-router-dom";

// PUBLIC
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Explore from '../pages/public/Explore';
import Services from '../pages/public/Services';
import PropertyDetail from '../pages/public/PropertyDetail';

// AUTH
import Login from '../pages/auth/Login';

// ADMIN
import DashboardLayout from '../layouts/DashboardLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotFound from '../pages/NotFound';


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
          {/* AUTH */}
          <Route path='/login' element={<Login />} />
        </Route>

          


        {/* ADMIN */}
        <Route element={<DashboardLayout />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>


        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default AppRoutes;