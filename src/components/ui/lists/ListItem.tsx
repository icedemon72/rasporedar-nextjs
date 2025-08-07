'use client';

import React from 'react';
import { Trash } from 'lucide-react';

interface ListItemProps {
  text: string;
  index: number;
  deleteFunc: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ text, index, deleteFunc }) => {
  return (
    <div className="group flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 hover:shadow-sm transition-colors">
      <div className="flex items-center gap-3 text-sm text-gray-800">
        <span className="text-gray-400 font-mono w-6">{index + 1}.</span>
        <p className="truncate">{text}</p>
      </div>
      <button
        onClick={deleteFunc}
        className="text-red-500 hover:text-red-600 p-1 rounded transition-opacity opacity-0 group-hover:opacity-100"
        title="Obriši"
        type="button"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ListItem;
