import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  // Read collapse state from localStorage or default to false (expanded)
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar_collapsed', String(next));
      return next;
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(prev => !prev);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className="enterprise-layout">
      {/* BI Collapsible Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleCollapse={toggleCollapse} 
        isMobileOpen={isMobileOpen} 
        closeMobile={closeMobile} 
      />

      {/* Top Application Header */}
      <Header 
        isCollapsed={isCollapsed} 
        toggleMobileMenu={toggleMobileMenu} 
      />

      {/* Main Page Body Content Area */}
      <main 
        className="enterprise-content" 
        style={{
          marginLeft: isCollapsed ? '76px' : '270px',
          paddingTop: '4.5rem',
          minHeight: '100vh',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: '#f8fafc'
        }}
      >
        {children}

        {/* Global Footer */}
        <footer style={{ borderTop: '1px solid #e2e8f0', padding: '1.5rem 2rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem', backgroundColor: '#ffffff', marginTop: '3rem' }}>
          <div>&copy; {new Date().getFullYear()} LMS Pelatihan Koding FPKTL — Kementerian Kesehatan Republik Indonesia. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
