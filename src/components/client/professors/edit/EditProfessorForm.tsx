'use client';

import { useApi } from "@/context/api-context";
import { Professor } from "@/types/data";
import { useRouter } from "next/navigation";
import ProfessorFormBase from "../ProfessorFormBase";
import { toast } from "react-toastify";

interface EditProfessorFormProps {
  professorData: Professor;
}

const EditProfessorForm = ({ professorData }: EditProfessorFormProps) => {
  const { api, client } = useApi();
  const router = useRouter();

  const handleEdit = async (data: Omit<Professor, '_id'>) => {
    await api(() => client.editProfessor(professorData.institution, professorData._id, data), {
      onSuccess: () => {
        toast.success('Profesor je uspešno izmenjen.')
        router.refresh(); 
      },
      onError: (err) => {
        toast.error('Greška prilikom izmene profesora. ' + err?.message);
        console.error('Error editing professor:', err);
      }
    });
  };

  const { _id, ...rest } = professorData;

  return (
    <ProfessorFormBase
      initialData={rest}
      onSubmit={handleEdit}
      submitText="Sačuvaj izmene"
    />
  );
};


export default EditProfessorForm;