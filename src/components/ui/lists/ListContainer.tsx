import React from 'react'

interface ListContainerProps {
  children: React.ReactNode;
}

const ListContainer: React.FC<ListContainerProps> = ({ children }) => {
  return (
    <div className="max-h-[400px] overflow-y-auto border p-2 space-y-2">
      { children }
    </div>
  )
}

export default ListContainer