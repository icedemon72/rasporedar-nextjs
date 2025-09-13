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

  const linkPrefix = `/app/institutions/${institution._id}`;

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      <div>
        <Link href={linkPrefix} className="text-lg font-semibold text-gray-800">
          {institution.name}
        </Link>
        <p className="text-sm text-gray-500">ID: {institution._id}</p>
      </div>

      <div className="flex flex-col gap-2">
        <InstitutionLink
          href={`${linkPrefix}/subjects`}
          icon={<BookOpen className="w-4 h-4" />}
          label="Predmeti"
        />
        <InstitutionLink
          href={`${linkPrefix}/professors`}
          icon={<Users className="w-4 h-4" />}
          label="Profesori"
        />
        <InstitutionLink
          href={`${linkPrefix}/schedules`}
          icon={<Calendar className="w-4 h-4" />}
          label="Rasporedi"
        />
        <InstitutionLink
          href={`${linkPrefix}/users`}
          icon={<UserCog className="w-4 h-4" />}
          label="Korisnici"
        />
        {isOwner && (
          <InstitutionLink
            href={`${linkPrefix}/edit`}
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
      className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
};