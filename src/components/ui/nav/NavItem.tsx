import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { NavLink } from '@/types/nav';

export interface NavItemProps {
  link: NavLink;
  active?: boolean;
  liClassName?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  link, active = false, liClassName = ''
}) => {
  const isDropdown = (link.isDropdown && link?.links?.length && link?.links?.length > 0);

  return (
    <>
      {
        isDropdown ? (
          <div className="relative group">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              { link.label }
            </button>

            <div className="absolute left-0 mt-2 w-40 bg-secondary border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-50">
              {link.links!.map((sublink, index) => (
                <Link
                  key={index}
                  href={sublink.url ?? '#'}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {sublink.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            href={link.url ?? '#'}
            className={clsx(
              'px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md',
              liClassName,
              active && 'text-orange-500'
            )}
          >
            { link.label }
          </Link>
        )
      }
    </>
  );
}

export default NavItem;