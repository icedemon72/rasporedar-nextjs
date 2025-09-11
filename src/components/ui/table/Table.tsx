import React, { TableHTMLAttributes } from 'react';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className = '', ...props }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table {...props} className={`min-w-full border border-gray-200 text-left ${className}`}>
        {children}
      </table>
    </div>
  );
};

export default Table;
