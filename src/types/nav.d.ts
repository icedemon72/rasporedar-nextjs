export type NavLink = {
  url?: string;
  isDropdown?: boolean;
  label: string;
  links?: NavLink[];
}

export interface INavbar {
  logo: string; // maybe convert this to image
  title: string;
  links:  NavLink[];
} 
