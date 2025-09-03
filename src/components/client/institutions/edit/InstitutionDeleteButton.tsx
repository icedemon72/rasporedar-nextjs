'use client';

import React from 'react'
import { Institution } from '@/types/data'
import { Trash2 } from 'lucide-react';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import { useApi } from '@/context/api-context';
import { useModal } from '@/hooks/use-modal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import DeleteModal from '@/components/ui/modals/DeleteModal';

interface InstitutionDeleteButtonProps {
  institution: Institution;
}

const InstitutionDeleteButton: React.FC<InstitutionDeleteButtonProps> = ({
  institution
}) => {
  const router = useRouter();
  const modal = useModal();
  const { client, api } = useApi();

  const handleOpenDeleteModal = () => {
    modal.open('delete', {
      id: institution._id,
      title: `Da li želite da obrišete grupu '${institution.name}'?`,
      description: 'Ova akcija je nepovratna i može biti vrlo opasna. Da li ste sigurni?',
      onConfirm: async () => {
        await api(
          () => client.deleteInstitution(institution._id),
          {
            onSuccess() {
              toast.success('Grupa je uspešno obirsana.');
              router.replace(`/app/institutions`);
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
        Obriši grupu
      </button>
      <ModalHost 
        key={institution._id}
        registry={{
          'delete': DeleteModal
        }}
        state={modal.state}
        close={modal.close}
      />
    </>
  );
}

export default InstitutionDeleteButton