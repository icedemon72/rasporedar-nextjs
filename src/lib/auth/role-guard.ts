import { getRoleInInstitution } from '@/lib/fetch/server';
import { InstitutionRole } from '@/types/global';
import { notFound } from 'next/navigation';

export async function guardRoleInInstitution(institutionId: string, allowedRoles: InstitutionRole[]) {
  const role = await getRoleInInstitution(institutionId);

  if (!allowedRoles.includes(role)) {
    notFound();
  }

  return role;
}

export function includesRole(role: InstitutionRole, allowedRoles: InstitutionRole[]): boolean {
  return allowedRoles.includes(role);
}