'use client';

import React, { useEffect } from 'react';
import { NavLink } from '@/types/nav';
import NavItem from './NavItem';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/auth-context';
import { logout } from '@/lib/auth/auth';

interface SidebarProps {
  links: NavLink[];
  onClose: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  links, 
  onClose, 
  isOpen
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Uspešno odjavljivanje');
    router.replace('/auth/login');
  }

  console.log(user);

  useEffect(() => {
    onClose();
  }, [ pathname ]);

  return (
    <div 
      className={clsx(
        `fixed inset-0 z-[100]`, 
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
        className={`fixed top-0 left-0 h-full w-64 bg-secondary shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button onClick={() => onClose()} className="p-4">
          ✕
        </button>

        <ul className="space-y-2 p-4">
          {links.map((link, index) => (
            <li key={index}>
             <NavItem liClassName='w-full' link={link} active={pathname === link.url} />
            </li>
          ))}
          {
            !user ? (
              <>
                <li>
                  <NavItem link={{ label: 'Prijava', url: '/auth/login' }} active={pathname === '/auth/login'} />
                </li>
              </>
            ) : (
              <>
                <li className="w-full">
                  <NavItem link={{ label: 'Panel', url: '/app' }} active={pathname === '/app'} />
                </li>
                <li>
                  <NavItem link={{ label: 'Moje grupe', url: '/app/institutions' }} active={pathname === '/app/dashboard'} />
                </li>
                <li>
                  <NavItem link={{ label: 'Kreiraj novu', url: '/app/institutions/create' }} active={pathname === '//app/institutions/create'} />
                </li>
                <li>
                  <NavItem link={{ label: 'Pridruži se', url: '/app/institutions/join' }} active={pathname === '/app/institutions/join'} />
                </li>
                <li>
                  <button 
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                    onClick={() => handleLogout()}
                  >
                    Odjavi se
                  </button>
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