'use client';

import { useApi } from '@/context/api-context';
import { Professor, Subject } from '@/types/data';
import { OptionType } from '@/types/global';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SubjectFormBase from '../SubjectFormBase';

interface EditSubjectFormProps {
  subject: Subject;
  professors: Professor[];
}

const EditSubjectForm: React.FC<EditSubjectFormProps> = ({ subject, professors }) => {
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
      institution: subject.institution,
      professors: formData.professors.map((p) => p.value) as string[],
      assistents: formData.assistents.map((a) => a.value) as string[],
    };

    await api(() => client.editSubject(subject.institution, subject._id, payload), {
      onSuccess(data) {
        toast.success('Predmet je uspešno izmenjen.');
        router.refresh();
      },
      onError(error) {
        toast.error('Greška prilikom izmene predmeta. ' + error?.message)
        console.error('Error:', error);
      }
    });
  };

  return (
    <SubjectFormBase
      professors={professors}
      initialData={{
        name: subject.name,
        description: subject.description,
        goal: subject.goal,
        result: subject.result,
        professors: subject.professors.map((id) => {
          const prof = professors.find((p) => p._id === id);
          return { label: prof?.name ?? 'Nepoznat', value: id };
        }),
        assistents: subject.assistents.map((id) => {
          const ass = professors.find((p) => p._id === id);
          return { label: ass?.name ?? 'Nepoznat', value: id };
        }),
      }}
      onSubmit={handleSubmit}
      submitText="Izmeni predmet"
    />
  );
};

export default EditSubjectForm;
