'use client';

import DashboardCard from '@/components/ui/dashboard/DashboardCard';
import { useAuth } from '@/context/auth-context';
import { Institution } from '@/types/data';
import { Pencil } from 'lucide-react';
import React from 'react';

interface InstitutionCardsProps {
  institution: Institution;
}

const InstitutionCards: React.FC<InstitutionCardsProps> = ({
  institution
}) => {
  const { user } = useAuth();

  const isOwner = user?.id === institution.createdBy;

  console.log(user, institution);
  
  return (
    <>
      {
        isOwner && (
          <DashboardCard
            href={`/app/institutions/${institution._id}/edit`}
            title="Uredi grupu"
            description="Uredi naziv, kodove i ostale informacije grupe."
            icon={<Pencil className="w-6 h-6" />}
          />
        )
      }
    </>
  );
}

export default InstitutionCards;