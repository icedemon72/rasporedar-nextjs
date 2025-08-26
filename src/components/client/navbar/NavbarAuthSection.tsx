'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import NavItem from '@/components/ui/nav/NavItem';
import { usePathname } from 'next/navigation';
import NavbarSectionTitle from './NavbarSectionTitle';

interface NavbarAuthSectionProps {
  children?: React.ReactNode;
}

const NavbarAuthSection: React.FC<NavbarAuthSectionProps> = ({
  children
}) => {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return (
      <div className="flex flex-col">
        { children }
        <NavbarSectionTitle title={'Sesija'} />
        <NavItem link={{ label: 'Prijava', url: '/auth/login' }} active={pathname === '/auth/login'} />
        <NavItem link={{ label: 'Registracija', url: '/auth/register' }}  active={pathname === '/auth/register'} />
      </div>
    );
  }
  
  return (
    <>
      <div className="flex flex-col">
        { children }
        <NavbarSectionTitle title={'Grupe'} />
        <NavItem link={{ label: 'Panel', url: '/app' }} active={pathname === '/app'} />
        <NavItem link={{ label: 'Moje grupe', url: '/app/institutions' }} active={pathname === '/app/institutions'} />
        <NavItem link={{ label: 'Kreiraj novu', url: '/app/institutions/create' }} active={pathname === '/app/institutions/create'} />
        <NavItem link={{ label: 'Pridruži se', url: '/app/institutions/join' }} active={pathname === '/app/institutions/join'} />
      </div>
      <div className="flex flex-col">
        <NavbarSectionTitle title={'Sesija'} />
        <NavItem link={{ label: 'Moj profil', url: '/app/profile' }} active={pathname === '/app/profile'} />
        <NavItem link={{ label: 'Izloguj se', url: '/auth/logout' }} />
        {user.role === 'Admin' && (
          <NavItem
            link={{
              label: 'Admin Panel',
              url: `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_URL}/admin`,
            }}
          />
        )}
      </div>
    </>
  );
};

export default NavbarAuthSection;
