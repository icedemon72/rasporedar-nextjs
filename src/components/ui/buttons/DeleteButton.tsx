"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <button className="icon-button text-red-600 hover:text-red-800" onClick={onDelete}>
      <Trash2 />
    </button>
  );
};

export default DeleteButton;