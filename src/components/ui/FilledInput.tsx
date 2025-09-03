'use client';

import React from "react";

interface FilledInputProps {
  label: string;
  value?: string;
}

const FilledInput: React.FC<FilledInputProps> = ({ 
  label, value
}) => {
  return (
    <div className='form-control'>
      <p className="label-primary">
        { label }
      </p>
      <div className="input-primary">
        { value?.trim() ?? '-' }
      </div>
    </div>
  );
};

export default FilledInput;
