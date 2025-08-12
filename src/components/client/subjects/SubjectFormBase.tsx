// components/forms/SubjectFormBase.tsx
'use client';

import Input from '@/components/ui/Input';
import SelectComponent from '@/components/ui/SelectComponent';
import Textarea from '@/components/ui/Textarea';
import { Professor, Subject } from '@/types/data';
import { OptionType } from '@/types/global';
import { Save } from 'lucide-react';
import React, { useCallback, useState } from 'react';

type SubjectFormData = Omit<Subject, '_id' | 'institution'> & {
  professors: OptionType[];
  assistents: OptionType[];
};

interface SubjectFormBaseProps {
  professors: Professor[];
  initialData: SubjectFormData;
  onSubmit: (data: SubjectFormData) => Promise<void>;
  submitText?: string;
}

const SubjectFormBase: React.FC<SubjectFormBaseProps> = ({
  professors,
  initialData,
  onSubmit,
  submitText = 'Sačuvaj predmet'
}) => {
  const [formData, setFormData] = useState<SubjectFormData>(initialData);

  const handleChange = useCallback(
    <K extends keyof SubjectFormData>(field: K) => (value: SubjectFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        id="name"
        name="Naziv predmeta"
        placeholder="Cloud computing"
        inputVal={formData.name}
        setVal={handleChange('name')}
        type="text"
      />

      <Textarea
        id="description"
        name="Opis predmeta"
        placeholder="Unesite opis predmeta..."
        inputVal={formData.description}
        setVal={handleChange('description')}
      />

      <Textarea
        id="goal"
        name="Cilj predmeta"
        placeholder="Unesite cilj predmeta..."
        inputVal={formData.goal}
        setVal={handleChange('goal')}
      />

      <Textarea
        id="result"
        name="Rezultat predmeta"
        placeholder="Unesite rezultat predmeta..."
        inputVal={formData.result}
        setVal={handleChange('result')}
      />

      <div className="form-control">
        <label className="label-primary">Profesori na predmetu</label>
        <SelectComponent
          data={professors.map((p) => ({ value: p._id, label: p.name }))}
          isMulti
          placeholder="Izaberite profesore"
          setVal={(newValue) => {
            setFormData((prev) => ({
              ...prev,
              professors: (newValue || []) as OptionType[],
            }));
          }}
          value={formData.professors}
          required
        />
      </div>

      <div className="form-control">
        <label className="label-primary">Asistenti na predmetu</label>
        <SelectComponent
          data={professors.map((p) => ({ value: p._id, label: p.name }))}
          isMulti
          placeholder="Izaberite asistente"
          setVal={(newValue) => {
            setFormData((prev) => ({
              ...prev,
              assistents: (newValue || []) as OptionType[],
            }));
          }}
          value={formData.assistents}
        />
      </div>

      <div className="flex justify-start">
        <button type="submit" className="w-full lg:w-auto btn-primary px-4 my-4">
          <Save />
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default SubjectFormBase;
