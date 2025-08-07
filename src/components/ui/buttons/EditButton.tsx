import { PenBox } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface EditButtonProps {
  type?: 'modal' | 'link';
  link?: string;
  onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({
  type = 'link', link, onClick
}) => {

  if (type === 'link') {
    return (
      <Link href={link!} className="icon-button">
        <PenBox className="border" />
      </Link>
    );
  }

  return (
    <button>
      <PenBox />
    </button>
  );
}

export default EditButton;