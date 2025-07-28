'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { NavLink } from '@/types/nav';

const Sidebar = dynamic(() => import('@/components/ui/nav/Sidebar'), {
  ssr: false,
});

interface NavbarClientProps {
  links: NavLink[];
  userLoggedIn: boolean;
}

const NavbarClient: React.FC<NavbarClientProps> = ({
  links,
  userLoggedIn = true
}) => {
  const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

     <Sidebar
        links={links}
        onClose={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
        userLoggedIn={userLoggedIn}
      />
    </>
  );
};

export default NavbarClient;