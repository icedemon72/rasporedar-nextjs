import React from 'react';
import NavbarClient from '@/components/client/navbar/NavbarClient';
import Link from 'next/link';
import NavItem from './NavItem';
import { User } from '@/types/fetch';
import NavbarAuthSection from '@/components/client/navbar/NavbarAuthSection';

interface NavbarProps {
  userLoggedIn?: User | null;
  navigationBar: any;
}

const Navbar: React.FC<NavbarProps> = ({
  userLoggedIn = null,
  navigationBar
}) => {
  return (
    <nav className="flex flex-col w-full md:w-64 bg-secondary shadow px-4 py-2 h-auto md:h-screen sticky top-0 overflow-y-hidden md:overflow-y-auto">
      <div className="hidden md:flex md:flex-col md:items-center md:h-full flex-1">
        <div className="text-xl font-bold">
          <Link href="/">{ navigationBar.title }</Link>
        </div>
        <div className="flex flex-col h-full w-full justify-between">
          <NavbarAuthSection />
        </div>
      </div>
    
      <div className="md:hidden">
        <NavbarClient links={navigationBar.links} />
      </div>
    </nav>
  );
}
export default Navbar;