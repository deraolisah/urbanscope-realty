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
import Privacy from '../pages/public/Privacy';
import Terms from '../pages/public/Terms';

// AUTH
import Login from '../pages/auth/Login';
import ProtectedRoute from '../components/ProtectedRoute';

// USER DASHBOARD
import UserDashboard from '../pages/user/UserDashboard';
import Favorites from '../pages/user/Favorites';

// ADMIN DASHBOARD
import DashboardLayout from '../layouts/DashboardLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AllProperties from '../pages/admin/AllProperties';
import AllUsers from '../pages/admin/AllUsers';
import AddProperty from '../pages/admin/AddProperty';
import AddAgent from '../pages/admin/AddAgent';
import EditProperty from '../pages/admin/EditProperty';
import Settings from '../pages/admin/Settings';

// ERROR 404
import NotFound from '../pages/NotFound';
import ForgotPassword from '../pages/auth/ForgotPassword';


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
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/terms' element={<Terms />} />
          {/* AUTH */}
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>
        
        
        {/* USER DASHBOARD ROUTES */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute requiredRole="user">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path='favorites' element={<Favorites />} />
          {/* Add more user routes here later */}
        </Route>


        {/* ADMIN DASHBOARD ROUTES */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="properties" element={<AllProperties />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="add-agent" element={<AddAgent />} />
          <Route path="edit-property/:id" element={<EditProperty />} />
          <Route path="settings" element={<Settings />} />
          {/* Add more admin routes here */}
        </Route>
        


        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default AppRoutes;