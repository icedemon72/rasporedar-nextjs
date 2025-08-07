import { InstitutionCreateBody, LoginResponse, RegisterUserBody } from "@/types/fetch"
import { fetchWithAuthClient } from "../auth/auth"
import { Institution } from "@/types/data";



export class ApiClient {
  protected API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  static async createInstitution(body: InstitutionCreateBody) {
    const response = await fetchWithAuthClient('/institutions', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    
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
}

export const api = new ApiClient();