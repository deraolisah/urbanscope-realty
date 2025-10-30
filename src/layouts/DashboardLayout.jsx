// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const DashboardLayout = () => {
//   return (
//     <div>
//       <Navbar />
//       <Outlet />
//     </div>
//   )
// }

// export default DashboardLayout;


import React, { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { AuthContext } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader isOpen={sidebarOpen} onMenuClick={toggleSidebar} />
      {user.role === "admin" && (
        <DashboardSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      )}
      <main className={`${user.role === "admin" && "lg:ml-64"} min-h-screen`}>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;