'use client';

import React, { useCallback, useRef, useState } from 'react';
import Input from '@/components/ui/Input';
import { Professor, ProfessorEducation, ProfessorEducationType } from '@/types/data';
import { EDUCATION_KEYS } from '@/constants/professors';
import { Plus, Save } from 'lucide-react';
import { addItemToArrayOnKey } from '@/utils/update-array';
import ListItem from '@/components/ui/lists/ListItem';
import ListContainer from '@/components/ui/lists/ListContainer';
import Textarea from '@/components/ui/Textarea';

const educationTemplate: ProfessorEducation = {
  institution: '',
  from: '',
  to: ''
}

const CreateProfessorForm = () => {
  const [ formData, setFormData ] = useState<Omit<Professor, '_id' | 'institution'>>({
    bio: '',
    education: {
      bachelor: educationTemplate,
      doctorate: educationTemplate,
      master: educationTemplate
    },
    name: '',
    references: [],
    title: ''
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [ reference, setReference ] = useState<string>('');

  const handleChange = useCallback(
    <K extends keyof typeof formData>(field: K) => (value: typeof formData[K]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleEducationChange = (type: ProfessorEducationType, field: keyof ProfessorEducation) => 
  (value: string) => {
    setFormData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [type]: {
          ...prev.education[type],
          [field]: value
        }
      }
    }));
  };

  const handleAddReference = (
    value: string,
    key: string | null = 'Enter'
  ) => {
    const toAdd = addItemToArrayOnKey(formData.references, value, key, true);

    if (toAdd.changed) {
      setFormData(prev => ({ ...prev, references: toAdd.result }));
      setReference('');
    }
  };

  const handleDeleteReference = (index: number) => {
    setFormData(prev => ({ ...prev, references: prev.references.filter((_, i) => i !== index) }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Input 
          id="title" 
          name='Zvanje' 
          placeholder='Prof. dr.'
          inputVal={formData.title}
          setVal={handleChange('title')}
          type='text'
        />
        <Input 
          id="name" 
          name='Ime i prezime' 
          placeholder='Marko Marković'
          inputVal={formData.name}
          setVal={(val) => setFormData(prev => ({...prev, name: val }))}
          type='text'
        />
      </div>
      <Textarea 
        id="bio" 
        name='Stručna biografija profesora' 
        placeholder='Profesionalna biografija...'
        inputVal={formData.bio}
        setVal={handleChange('bio')}
      />

      {
        Object.keys(formData.education).map((key: string | ProfessorEducationType, index) => (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" key={index}>
            <div className="col-span-1">
              <Input 
                id={`education-${key}`}
                name={EDUCATION_KEYS[key as ProfessorEducationType]}
                placeholder='Prirodno-matematički fakultet, Univerzitet u Prištini'
                inputVal={formData.education[key as ProfessorEducationType].institution!}
                setVal={handleEducationChange(key as ProfessorEducationType, 'institution')}
                type='text'
              />
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-1">
              <div>
                <Input 
                  id={`education-${key}`}
                  name={'Od'}
                  placeholder='Od'
                  inputVal={formData.education[key as ProfessorEducationType].from!}
                  setVal={handleEducationChange(key as ProfessorEducationType, 'from')}
                  type='text'
                  required={false}
                />
              </div>
              <div>
                <Input 
                  id={`education-${key}`}
                  name={'Do'}
                  placeholder='Do'
                  inputVal={formData.education[key as ProfessorEducationType].to!}
                  setVal={handleEducationChange(key as ProfessorEducationType, 'to')}
                  type='text'
                  required={false}
                />
              </div>
            </div>
          </div>
        ))
      }

      <div className="form-control">
        <label className="label-primary">Reference</label>
        <div className="w-full flex gap-1 mb-4">
          <input
            className="input-primary"
            type="text"
            placeholder="Reference profesora (Enter za unos)"
            value={reference}
            ref={inputRef}
            onChange={(e) => setReference(e.target.value)}
            onKeyUp={(e) => handleAddReference(reference, e.key)}
          />
          <button
            type="button"
            className="btn-primary"
            onClick={() => handleAddReference(reference, null)}
          >
            <Plus />
          </button>
        </div>
      </div>

      {
        formData.references.length ? (
          <ListContainer>
            {
              formData.references.map((ref, i) => (
                <ListItem
                  key={i}
                  text={ref}
                  index={i}
                  deleteFunc={() => handleDeleteReference(i)}
                />
              ))
            }
          </ListContainer>
        ) : null
      }

      <div className="flex justify-start">
        <button type='submit' className="w-full lg:w-auto btn-primary px-4 my-4">
          <Save />
          Sačuvaj profesora
        </button>
      </div>

    </form>
  );
}

export default CreateProfessorForm;