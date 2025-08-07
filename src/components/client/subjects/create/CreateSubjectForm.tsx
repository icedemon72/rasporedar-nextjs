'use client';

import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Subject } from '@/types/data';
import React, { useCallback, useState } from 'react';

const CreateSubjectForm = () => {
  const [ formData, setFormData ] = useState<Omit<Subject, '_id' | 'institution'>>({
    assistents: [],
    description: '',
    goal: '',
    name: '',
    professors: [],
    // references: [],
    result: '',
  });

  const handleChange = useCallback(
    <K extends keyof typeof formData>(field: K) => (value: typeof formData[K]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(formData);
  }

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
        name='Opis predmeta' 
        placeholder='Unesite opis predmeta...'
        inputVal={formData.description}
        setVal={handleChange('description')}
      />

      <Textarea 
        id="goal" 
        name='Cilj predmeta' 
        placeholder='Unesite cilj predmeta...'
        inputVal={formData.goal}
        setVal={handleChange('goal')}
      />

      <Textarea 
        id="result" 
        name='Rezultat predmeta' 
        placeholder='Unesite rezultat predmeta...'
        inputVal={formData.result}
        setVal={handleChange('result')}
      />
    </form>
  );
}

export default CreateSubjectForm;