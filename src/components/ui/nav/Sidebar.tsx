'use client';

import React, { useEffect } from 'react';
import { NavLink } from '@/types/nav';
import NavItem from './NavItem';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
// TODO: make this accept dynamic props...

interface SidebarProps {
  links: NavLink[];
  onClose: () => void;
  isOpen: boolean;
  userLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  links, 
  onClose, 
  isOpen,
  userLoggedIn = false
}) => {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [ pathname ]);

  return (
    <div 
      className={clsx(
        `fixed inset-0 z-50`, 
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
    >
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button onClick={onClose} className="p-4">
          ✕
        </button>

        <ul className="space-y-2 p-4">
          {links.map((link, index) => (
            <li key={index}>
             <NavItem link={link} active={pathname === link.url} />
            </li>
          ))}
          {
            !userLoggedIn && (
              <>
                <li>
                  <NavItem link={{ label: 'Prijava', url: '/auth/login' }} active={pathname === '/auth/login'} />
                </li>
              </>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;