'use client';

import React from 'react';
import DeleteButton from '@/components/ui/buttons/DeleteButton';
import DeleteModal from '@/components/ui/modals/DeleteModal';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import { useApi } from '@/context/api-context';
import { useModal } from '@/hooks/use-modal';
import { Professor } from '@/types/data';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface ProfessorDeleteEditButtonProps {
  professor: Professor;
}

const ProfessorDeleteEditButton: React.FC<ProfessorDeleteEditButtonProps> = ({
  professor
}) => {
  const router = useRouter();
  const modal = useModal();
  const { client, api } = useApi();

  const handleOpenDeleteModal = () => {
    modal.open('delete', {
      id: professor._id,
      title: `Da li želite da obrišete profesora '${professor.name}'?`,
      description: 'Ova akcija je nepovratna i može biti vrlo opasna. Da li ste sigurni?',
      onConfirm: async () => {
        await api(
          () => client.deleteProfessor(professor.institution, professor._id),
          {
            onSuccess() {
              toast.success('Profesor je uspešno obirsan.');
              router.replace(`/app/institutions/${professor.institution}/professors/`);
            }
          }
        );
      }
    });
  }

  return (
    <>
      <button className="w-full lg:w-auto btn-primary px-4 my-4" onClick={handleOpenDeleteModal}>
        <Trash2 />
        Obriši profesora
      </button>
      <ModalHost 
        key={professor._id}
        registry={{
          'delete': DeleteModal
        }}
        state={modal.state}
        close={modal.close}
      />
    </>
  );
}

export default ProfessorDeleteEditButton;