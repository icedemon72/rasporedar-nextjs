// components/forms/CreateSubjectForm.tsx
'use client';

import { useApi } from '@/context/api-context';
import { Professor } from '@/types/data';
import { OptionType } from '@/types/global';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SubjectFormBase from '../SubjectFormBase';

interface CreateSubjectFormProps {
  professors: Professor[];
  institution: string;
}

const CreateSubjectForm: React.FC<CreateSubjectFormProps> = ({ professors, institution }) => {
  const { api, client } = useApi();
  const router = useRouter();

  const handleSubmit = async (formData: {
    name: string;
    description: string;
    goal: string;
    result: string;
    professors: OptionType[];
    assistents: OptionType[];
  }) => {
    const payload = {
      ...formData,
      professors: formData.professors.map((p) => p.value) as string[],
      assistents: formData.assistents.map((a) => a.value) as string[],
    };

    await api(() => client.addSubject(institution, payload), {
      onSuccess(data) {
        toast.success('Predmet je uspešno kreiran.');
        router.push(`/app/institutions/${institution}/subjects/${data._id}`);
      },
      onError(error) {
        toast.error('Greška prilikom pravljenja predmeta. ' + error?.message);
        console.error('Error:', error);
      }
    });
  };

  return (
    <SubjectFormBase
      professors={professors}
      initialData={{
        name: '',
        description: '',
        goal: '',
        result: '',
        professors: [],
        assistents: [],
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateSubjectForm;
