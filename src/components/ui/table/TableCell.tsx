import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
  header?: boolean;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, header = false, className = '' }) => {
  const Tag = header ? 'th' : 'td';

  return (
    <Tag className={`px-4 py-2 ${header ? 'font-semibold text-sm td-text' : 'th-text'} ${className}`}>
      {children}
    </Tag>
  );
};

export default TableCell;
