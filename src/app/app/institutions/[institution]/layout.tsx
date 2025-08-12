import { getRoleInInstitution } from '@/lib/fetch/server';
import { PageProps } from '@/types/page';
import { ReactNode } from 'react';

export default async function InstitutionLayout({ params, children }: PageProps & { children: ReactNode }) {
  const { institution } = await params;
  await getRoleInInstitution(institution);

  return <>{children}</>;
}