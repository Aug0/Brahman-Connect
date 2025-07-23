import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/TopBar';
import { Outlet } from 'react-router-dom';

const MainLayout = ({showSideBar=true}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FCFBF5] overflow-hidden">
      {/* Sidebar for large screens and slide-in for small screens */}
      {
         showSideBar && 
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      }

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="sticky top-0 z-20">
          <Topbar onMenuClick={() => setSidebarOpen(true)} isForHomePage={showSideBar?false:true}  bgcolor={!showSideBar ?"bg-[#D75A28]":null}/>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
