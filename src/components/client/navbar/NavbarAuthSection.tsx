'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import NavItem from '@/components/ui/nav/NavItem';
import { usePathname } from 'next/navigation';
import NavbarSectionTitle from './NavbarSectionTitle';
import { useApi } from '@/context/api-context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface NavbarAuthSectionProps {
  children?: React.ReactNode;
}

const NavbarAuthSection: React.FC<NavbarAuthSectionProps> = ({
  children
}) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { api, client } = useApi();

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

  const handleLogout = async () => {
    await api(
      () => client.logout(),
    );

    toast.success('Uspešno ste se izlogovali.');
    window.location.reload();
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
        <button
          onClick={() => handleLogout()}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md text-left"
        >
          Izloguj se
        </button>
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
