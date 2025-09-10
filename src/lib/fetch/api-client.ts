import { BasicCreateResponse, InstitutionCreateBody, LoginResponse, RegisterUserBody, UpdateUserBody, User } from "@/types/fetch"
import { fetchWithAuthClient } from "../auth/auth"
import { Institution, Professor, Subject } from "@/types/data";
import { getApiURL } from "@/utils/docker";

export class ApiClient {
  protected API_BASE_URL = getApiURL() || 'http://localhost:3001';

  async createInstitution(body: InstitutionCreateBody) {
    const response = await fetchWithAuthClient('/api/institutions', {
      method: 'POST',
      body: JSON.stringify(body)
    }, true);
    
    const data: Institution = await response.json();
    return data;
  }

  async register(body: RegisterUserBody) {
    const response = await fetchWithAuthClient('/register', {
      method: 'POST',
      body: JSON.stringify(body)
    });

    const data: any = await response.json();
    return data;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetchWithAuthClient(`/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
  
    return data;
  }

  async logout(): Promise<{}> {
    const response = await fetchWithAuthClient(`/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    }, true);
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Logout failed.');
    }
  
    return data;
  }

  async addProfessor(institution: string, body: Omit<Professor, '_id' | 'institution'>): Promise<BasicCreateResponse> {
    const response = await fetchWithAuthClient(`/api/institutions/${institution}/professors`, {
      method: 'POST',
      body: JSON.stringify(body)
    }, true);

    const data: BasicCreateResponse = await response.json();
    return data;
  }

  async editProfessor(institution: string, professorId: string, body: Omit<Professor, '_id'>): Promise<BasicCreateResponse> {
    const response = await fetchWithAuthClient(`/api/institutions/${institution}/professors/${professorId}`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    }, true);

    const data: BasicCreateResponse = await response.json();
    return data;
  }

  async deleteProfessor(institution: string, professorId: string): Promise<{}> {
    const response = await fetchWithAuthClient(`/api/institutions/${institution}/professors/${professorId}`, {
      method: 'DELETE',
    }, true);

    const data = await response.json();
    return data;
  }

  async updateInstitution(institution: string, body: InstitutionCreateBody): Promise<Institution> {
    const response = await fetchWithAuthClient(`/api/institutions/${institution}`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    }, true);

    const data: Institution = await response.json();
    return data;
  }

  async deleteInstitution(institution: string): Promise<{}> {
    const response = await fetchWithAuthClient(`/api/institutions/${institution}`, {
      method: 'DELETE'
    }, true);

    const data = await response.json();
    return data;
  }

  async addSubject(institution: string, body: Omit<Subject, '_id' | 'institution'>): Promise<BasicCreateResponse> {
    const response = await fetchWithAuthClient(`/api/institutions/${institution}/subjects`, {
      method: 'POST',
      body: JSON.stringify(body)
    }, true);

    const data: BasicCreateResponse = await response.json();
    return data;
  }

  async editSubject(institution: string, subjectId: string, body: Omit<Subject, '_id'>): Promise<BasicCreateResponse> {
    const response = await fetchWithAuthClient(`/api/institutions/${institution}/subjects/${subjectId}`, {
      method: 'PATCH',
      body: JSON.stringify(body)
    }, true);

    const data: BasicCreateResponse = await response.json();
    return data;
  }

  async deleteSubject(institution: string, subjectId: string) {
    const response = await fetchWithAuthClient(`/api/institutions/${institution}/subjects/${subjectId}`, {
      method: 'DELETE'
    }, true);

    const data = await response.json();
    return data;
  }

  async joinInstitution(code: string, role: 'moderator' | 'user' = 'user'):  Promise<BasicCreateResponse> {
    const url = role === 'moderator'
      ? `/api/institutions/join_moderator` 
      : `/api/institutions/join`
    
    const response = await fetchWithAuthClient(url, {
      method: 'POST',
      body: JSON.stringify({ code, role })
    }, true);

    const data: BasicCreateResponse = await response.json();
    return data;
  }

  async updateUser(body: UpdateUserBody): Promise<User> {
    const response = await fetchWithAuthClient('/users/edit', {
      method: 'PATCH',
      body: JSON.stringify(body)
    });

    const data: User = await response.json();
    return data;
  }
}

export const api = new ApiClient();