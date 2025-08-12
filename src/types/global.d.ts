export interface OptionType {
  label: string;
  value: any;
  [key: string]: any;
}

export interface BreadcrumbLink {
  label: string;
  url?: string;
  active?: boolean;
}

export type InstitutionRole = 'Owner' | 'Moderator' | 'User';