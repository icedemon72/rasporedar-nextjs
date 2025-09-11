export type UserRoles = 'Admin' | 'User';

export type LoggedInUser = {
  username: string;
  _id: string;
  role: UserRoles;
  iat: number;
  exp: number;
}

export type Institution = {
  _id: string;
  createdAt: string;
  createdBy: string;
  departments: string[];
  name: string;
  role: string;
  typeOf: string;
  updatedAt: string;

  code?: string;
  moderatorCode?: string;
  subjects?: Subject[];
}

export type Subject = {
  _id: string;
  assistents: string[] | Partial<Professor>[];
  description: string;
  institution: string;
  name: string;
  professors: string[] | Partial<Professor>[];
  // references: string[];
  result: string;
  goal: string;
}

export type ProfessorsSubjects = {
  assistent: Subject[];
  professor: Subject[];
}

export type BaseProfessorEducation = {
  from: string;
  to: string;
  institution: string;
}

export type ProfessorEducation = Partial<BaseProfessorEducation>;

export type ProfessorEducationType = 'bachelor' | 'master' | 'doctorate';

export type Professor = {
  _id: string;
  name: string;
  title: string;
  institution: string;
  bio: string;
  references: string[];
  education: Record<ProfessorEducationType, ProfessorEducation>;
}

export type ScheduleInstanceDefaultTime = {
  from: string;
  to: string;
}

export type ScheduleInstanceData = {
  subject: string | Subject;
  lecturer: string | Professor;
  from?: string;
  to?: string;
  location?: string;
}

export type ScheduleInstance = {
  data: ScheduleInstanceData[][];
  defaultTimes: ScheduleInstanceDefaultTime[];
}

export type ScheduleCreateOmit = '_id' | 'createdBy' | 'createdAt' | 'published' | 'archived' | 'updatedAt';

export type Schedule = {
  _id: string;
  archived: boolean;
  comment: string;
  createdAt: string;
  createdBy:string;
  days: string[];
  department: string;
  frequency: string;
  groups: string[];
  instances: ScheduleInstance[];
  institution: string | Institution;
  published: boolean;
  style: string;
  subtitle: string;
  systemType: string; // TODO: change this to enum
  title: string;
  updatedAt: string;
  validFrom: string;
  validUntil: string;
  data: any;
}

export type ExtendedSchedule = Partial<Schedule> & Partial<{ rows?: ScheduleInstance[] }>

export type ScheduleTime = {
  startTime: string;
  endTime: string
}

export interface SchedulePayload {
  subject: Subject;
  lecturer: Professor;
  time?: ScheduleTime | null;
  location: string;
  checkTime?: boolean;
  checkLocation?: boolean;
}