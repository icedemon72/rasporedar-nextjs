import { Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ViewButtonProps {
  link: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({ link }) => {
  return (
    <Link className="icon-button" href={link}>
      <Eye />
    </Link>
  )
}

export default ViewButton;