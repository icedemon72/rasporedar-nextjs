import { getRoleInInstitution } from '@/lib/fetch/server';
import { PageProps } from '@/types/page';
import { ReactNode } from 'react';

type LayoutProps = {
  params: Promise<{ institution: string }>;
  children: ReactNode;
};

export default async function InstitutionLayout(
  { params, children }: LayoutProps
) {
  const { institution } = await params;
  await getRoleInInstitution(institution);

  return <>{children}</>;
}