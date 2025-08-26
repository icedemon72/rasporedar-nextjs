import React from 'react';
import NavbarClient from '@/components/client/navbar/NavbarClient';
import Link from 'next/link';
import NavItem from './NavItem';
import { User } from '@/types/fetch';
import NavbarAuthSection from '@/components/client/navbar/NavbarAuthSection';
import { INavbar } from '@/types/nav';
import NavbarSectionTitle from '@/components/client/navbar/NavbarSectionTitle';

interface NavbarProps {
  userLoggedIn?: User | null;
  navigationBar: INavbar;
}

const Navbar: React.FC<NavbarProps> = ({
  userLoggedIn = null,
  navigationBar
}) => {
  return (
    <nav className="flex flex-col w-full md:w-64 bg-secondary shadow px-4 py-2 h-auto md:h-screen sticky top-0 overflow-y-hidden md:overflow-y-auto">
      <div className="hidden md:flex md:flex-col md:items-center md:h-full flex-1">
        <div className="text-xl font-bold py-2">
          <Link href="/">{ navigationBar.title }</Link>
        </div>
        <div className="flex flex-col h-full w-full justify-between">
          <NavbarAuthSection>
            <>
              <NavbarSectionTitle title='Stranice' />
              {
                navigationBar.links.map((link, index) => (
                  <NavItem link={link} key={index} />
                ))
              }
            </>
          </NavbarAuthSection>
        </div> 
      </div>
    
      <div className="md:hidden">
        <NavbarClient links={navigationBar.links} />
      </div>
    </nav>
  );
}
export default Navbar;