export interface OptionType {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface BreadcrumbLink {
  label: string;
  url?: string;
  active?: boolean;
}