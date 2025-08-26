import { Institution, Professor, ProfessorsSubjects, Schedule, Subject } from "@/types/data";
import { fetchWithAuthServer } from "../auth/auth-server"
import { cookies } from "next/headers";
import { InstitutionRole } from "@/types/global";

const defaultNextOptions = {
  revalidate: 3600,
}

export const getInstitution = async (id: string, options: RequestInit = {}): Promise<Institution> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: (options?.next?.tags || ['institutions', `institution-${id}`])
  }

  const response = await fetchWithAuthServer(`/institutions/${id}`, {
    next
  });

  const data: Institution = await response.json();
  return data;
}

export const getUserInstitutions = async (options: RequestInit = { next: { revalidate: 0 } }): Promise<Institution[]> => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refresh_token');

  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: [`institutions`, `institutions-${refreshToken}`]
  }

  const response = await fetchWithAuthServer(`/user_institutions/`, {
    next
  });

  const data: Institution[] = await response.json();
  return data;
}

export const getRoleInInstitution = async (id: string, options: RequestInit = {}): Promise<InstitutionRole>  => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refresh_token');
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: ['institutions', `institution-${id}`, `institution-${id}-role-${refreshToken}`]
  }

  const response = await fetchWithAuthServer(`/institutions/${id}/role`, {
    next
  });

  const data: { role: InstitutionRole } = await response.json();
  return data.role;
}

export const getInstitutionSubjects = async (id: string, options: RequestInit = {}): Promise<Subject[]> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: [`subjects`, `subjects-institution-${id}`]
  }

  const response = await fetchWithAuthServer(`/institutions/${id}/subjects`, {
    next
  });

  const data: Subject[] = await response.json();
  return data;
}

export const getSubject = async (institution: string, id: string, options: RequestInit & { fullInfo?: boolean } = {}): Promise<Subject> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: [`subjects-institution-${institution}`, `subjects`, `subjects-${id}`]
  }
  
  let url = `/institutions/${institution}/subjects/${id}`;

  if (options.fullInfo) url += '?fullInfo=true';

  const response = await fetchWithAuthServer(url, {
    next
  });

  const data: Subject = await response.json();
  return data;
}

export const getInstitutionProfessors = async (id: string, options: RequestInit = {}): Promise<Professor[]> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: ['professors', `professors-institution-${id}`]
  }

  const response = await fetchWithAuthServer(`/institutions/${id}/professors`, {
    next
  });

  const data: Professor[] = await response.json();

  return data;
}

export const getProfessorSubjects = async (institution: string, id: string, options: RequestInit = {}): Promise<ProfessorsSubjects> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: ['professors', `professors-institution-${institution}`, `professors-${id}`, `professors-subjects-${id}`]
  }

  const response = await fetchWithAuthServer(`/institutions/${institution}/professors/${id}/subjects`, {
    next
  });

  const data: ProfessorsSubjects = await response.json();

  return data;
}

export const getProfessor = async (institution: string, id: string, options: RequestInit = {}): Promise<Professor> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: ['professors', `professors-institution-${institution}`, `professors-${id}`]
  }

  const response = await fetchWithAuthServer(`/institutions/${institution}/professors/${id}`, {
    next
  });

  const data: Professor = await response.json();

  return data;
}

export const getInstitutionSchedules = async (id: string, options: RequestInit = {}, query: Record<string, any>): Promise<Schedule[]> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: ['schedules', `schedules-institution-${id}`]
  }

  const response = await fetchWithAuthServer(`/institutions/${id}/schedules`, { next }, query);

  const data: Schedule[] = await response.json();
  return data;
}

export const getSchedule = async (institution: string, id: string, options: RequestInit = {}): Promise<Schedule> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: ['schedules', `schedules-institution-${institution}`, `schedules-${id}`]
  }

  const response = await fetchWithAuthServer(`/institutions/${institution}/schedules/${id}`, {
    next
  });

  const data: Schedule = await response.json();
  return data;
}