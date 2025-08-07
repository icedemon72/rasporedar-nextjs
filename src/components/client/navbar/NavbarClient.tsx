'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { NavLink } from '@/types/nav';

const Sidebar = dynamic(() => import('@/components/ui/nav/Sidebar'), {
  ssr: false,
});

interface NavbarClientProps {
  links: NavLink[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({
  links
}) => {
  const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(false);

  return (
    <div className="flex justify-end">
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
      />
    </div>
  );
};

export default NavbarClient;