'use client';

import React from 'react';
import FilledInput from '../../FilledInput';
import { BaseProfessorEducation } from '@/types/data';

interface ProfessorEducationFieldProps {
  label: string;
  value: Partial<BaseProfessorEducation>;
}

const ProfessorEducationField: React.FC<ProfessorEducationFieldProps> = ({ label, value }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="col-span-1">
        <FilledInput label={label} value={value?.institution || '-'} />
      </div>
      <div className="grid grid-cols-2 gap-4 col-span-1">
        <div>
          <FilledInput label="Od" value={value?.from || '-'} />
        </div>
        <div>
          <FilledInput label="Do" value={value?.to || '-'} />
        </div>
      </div>
    </div>
  );
};

export default ProfessorEducationField;