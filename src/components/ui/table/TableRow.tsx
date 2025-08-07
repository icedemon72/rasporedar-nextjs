import React from 'react';

interface TableRowProps {
  children: React.ReactNode;
  header?: boolean;
  className?: string;
}

const TableRow: React.FC<TableRowProps> = ({ children, header = false, className = '' }) => {
  const Tag = header ? 'thead' : 'tr';

  return (
    <Tag className={header ? '' : `border-b hover:bg-gray-50 ${className}`}>
      {children}
    </Tag>
  );
};

export default TableRow;
