import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className={`min-w-full border border-gray-200 text-left ${className}`}>
        {children}
      </table>
    </div>
  );
};

export default Table;
