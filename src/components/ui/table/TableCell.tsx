import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
  header?: boolean;
  className?: string;
  props?: any;
}

const TableCell: React.FC<TableCellProps> = ({ children, header = false, className = '', props }) => {
  const Tag = header ? 'th' : 'td';

  return (
    <Tag className={`w-auto px-4 py-2 ${header ? 'font-semibold text-sm td-text' : 'th-text'} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default TableCell;
