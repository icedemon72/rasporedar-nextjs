import clsx from 'clsx';
import React from 'react';

interface NavbarSectionTitleProps {
  className?: string;
  title: string;
}

const NavbarSectionTitle: React.FC<NavbarSectionTitleProps> = ({
  title,
  className = '',
}) => {
  return (
    <div className="flex items-center gap-1 px-2">
      <hr className="w-2" />
      <p className={clsx('font-semibold text-xs uppercase', className)}>{ title }</p>
      <hr className='flex-1' />
    </div>
  )
}

export default NavbarSectionTitle;