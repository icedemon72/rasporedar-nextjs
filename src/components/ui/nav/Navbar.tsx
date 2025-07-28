import React from 'react';
import NavbarClient from '@/components/client/navbar/NavbarClient';
import Link from 'next/link';
import NavItem from './NavItem';

interface NavbarProps {
  userLoggedIn?: boolean;
  navigationBar: any;
}

const Navbar: React.FC<NavbarProps> = ({
  userLoggedIn = true,
  navigationBar
}) => {
  
  return (
    <nav className="w-full bg-white shadow px-4 py-2 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href="/">{ navigationBar.title }</Link>
      </div>
      <div className="hidden md:flex space-x-4">
        {
          !userLoggedIn && (
            <>
              <NavItem link={{ label: 'Prijava', url: '/auth/login' }} />
              <NavItem link={{ label: 'Registracija', url: '/auth/register' }} />
            </>
          )
        }
        {
          userLoggedIn && (
            <>
              <NavItem link={{ label: 'Panel', url: '/app' }} />
            </>
          )
        }
      </div>
    
        <div className="md:hidden">
          <NavbarClient links={navigationBar.links} userLoggedIn={userLoggedIn} />
        </div>
    </nav>
  );
}
export default Navbar;