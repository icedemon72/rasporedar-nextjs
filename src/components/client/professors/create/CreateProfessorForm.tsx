'use client';

import React from 'react';
import { Professor, ProfessorEducation } from '@/types/data';
import { useApi } from '@/context/api-context';
import { useRouter } from 'next/navigation';
import ProfessorFormBase from '../ProfessorFormBase';
import { toast } from 'react-toastify';

const educationTemplate: ProfessorEducation = {
  institution: '',
  from: '',
  to: ''
}

interface CreateProfessorFormProps {
  institution: string;
}

const CreateProfessorForm = ({ institution }: CreateProfessorFormProps) => {
  const { api, client } = useApi();
  const router = useRouter();

  const handleCreate = async (data: Omit<Professor, '_id'>) => {
    await api(() => client.addProfessor(institution, data), {
      onSuccess: (prof) => {
        toast.success('Profesor je uspešno dodat.')
        router.push(`/app/institutions/${institution}/professors/${prof._id}`);
      },
      onError: (err) => {
        toast.error('Greška pri pravljenju profesora. ' + err?.message)
        console.error('Error creating professor:', err);
      }
    });
  };

  return (
    <ProfessorFormBase
      initialData={{
        name: '',
        title: '',
        bio: '',
        references: [],
        education: {
          bachelor: { institution: '', from: '', to: '' },
          master: { institution: '', from: '', to: '' },
          doctorate: { institution: '', from: '', to: '' },
        },
        institution
      }}
      onSubmit={handleCreate}
    />
  );
};


export default CreateProfessorForm;