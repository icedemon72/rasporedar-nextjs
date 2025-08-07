'use client';

import { useAuth } from '@/context/auth-context';
import { Institution } from '@/types/data';
import Link from 'next/link';
import React from 'react';
import {
  BookOpen,
  Users,
  Calendar,
  UserCog,
  Pencil,
} from 'lucide-react';

interface InstitutionCardProps {
  institution: Institution;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution }) => {
  const { user } = useAuth();
  const isOwner = user?.id === institution.createdBy;

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {institution.name}
        </h2>
        <p className="text-sm text-gray-500">ID: {institution._id}</p>
      </div>

      <div className="flex flex-col gap-2">
        <InstitutionLink
          href={`/app/institutions/${institution._id}/subjects`}
          icon={<BookOpen className="w-4 h-4" />}
          label="Predmeti"
        />
        <InstitutionLink
          href={`/app/institutions/${institution._id}/professors`}
          icon={<Users className="w-4 h-4" />}
          label="Profesori"
        />
        <InstitutionLink
          href={`/app/institutions/${institution._id}/schedules`}
          icon={<Calendar className="w-4 h-4" />}
          label="Rasporedi"
        />
        <InstitutionLink
          href={`/app/institutions/${institution._id}/users`}
          icon={<UserCog className="w-4 h-4" />}
          label="Korisnici"
        />
        {isOwner && (
          <InstitutionLink
            href={`/app/institutions/${institution._id}/edit`}
            icon={<Pencil className="w-4 h-4" />}
            label="Uredi"
          />
        )}
      </div>
    </div>
  );
};

export default InstitutionCard;

interface InstitutionLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const InstitutionLink: React.FC<InstitutionLinkProps> = ({ href, icon, label }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
};