import { Institution, Professor, ProfessorsSubjects, Schedule, Subject } from "@/types/data";
import { fetchWithAuthServer } from "../auth/auth-server"
import { cookies } from "next/headers";
import { InstitutionRole } from "@/types/global";
import { User } from "@/types/fetch";
import { handleApiResponse } from "./handle-api-response";

const defaultNextOptions = {
  revalidate: 3600,
}

export const getInstitution = async (id: string, options: RequestInit = {}, queryParams: Record<string, any> = {}): Promise<Institution> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: (options?.next?.tags || ['institutions', `institution-${id}`])
  }

  const response = await fetchWithAuthServer(`/institutions/${id}`, {
    next,
  }, queryParams
);

  return handleApiResponse<Institution>(response);
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

  return handleApiResponse<Institution[]>(response);
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

  return handleApiResponse<Subject[]>(response);
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

  return handleApiResponse<Subject>(response);
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

  return handleApiResponse<Professor[]>(response);
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

  return handleApiResponse<ProfessorsSubjects>(response);
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

  return handleApiResponse<Professor>(response);
}

export const getInstitutionSchedules = async (id: string, options: RequestInit = {}, query: Record<string, any>): Promise<Schedule[]> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
    tags: ['schedules', `schedules-institution-${id}`]
  }

  const response = await fetchWithAuthServer(`/institutions/${id}/schedules`, { next }, query);

  return handleApiResponse<Schedule[]>(response);
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

  return handleApiResponse<Schedule>(response);
}

export const getUser = async (options: RequestInit = {}): Promise<User> => {
  const next = {
    ...defaultNextOptions,
    ...options.next,
  }

  const response = await fetchWithAuthServer(`/users`, { next });

  return handleApiResponse<User>(response);
}