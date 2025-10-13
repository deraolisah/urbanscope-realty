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

// AGENT DASHBOARD
import AgentDashboard from '../pages/agent/AgentDashboard';
import AddProperty from '../pages/agent/AddProperty';
import EditProperty from '../pages/agent/EditProperty';


// ADMIN DASHBOARD
import DashboardLayout from '../layouts/DashboardLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateAgent from '../pages/admin/CreateAgent';

// ERROR 404
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
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/terms' element={<Terms />} />
          {/* AUTH */}
          <Route path='/login' element={<Login />} />
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
          {/* Add more user routes here later */}
        </Route>


        {/* AGENT DHASBOARD ROUTES */}
        <Route 
          path="/agent/*" 
          element={
            <ProtectedRoute requiredRole="agent">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AgentDashboard />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="edit-property/:id" element={<EditProperty />} />
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
          <Route path="create-agent" element={<CreateAgent />} />
          {/* Add more admin routes here */}
        </Route>


        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default AppRoutes;