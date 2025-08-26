import { ReactNode } from "react";

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

export type ModalState = { 
  key: null | string; 
  props?: any
};

export type ModalType = 'subject' | 'time' | 'delete' | null;

export interface ScheduleModalState {
  type: ModalType;
  data?: any; // can be { groupIndex, rowIndex, etc. }
}

export type ScheduleStyle = {
  background: string;
  titleBackground: string;
  rowStyle: string;
  colStyle: string;
  clockCol: string;
}

export interface ScheduleStyles {
  [key: string]: Partial<ScheduleStyle>;
}

export interface TooltipProps {
  children: ReactNode;
  tooltip: string;
  delayDuration?: number;
}