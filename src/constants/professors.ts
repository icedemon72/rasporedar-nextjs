import { ProfessorEducationType } from "@/types/data";

export const EDUCATION_KEYS: Record<ProfessorEducationType, string> = {
  bachelor: 'Osnovne studije',
  master: 'Master studije',
  doctorate: 'Doktorske studije'
}

export const PROFESSOR_TYPES = [
	{ value: 'professor', label: 'Profesor (predavanja)' },
	{ value: 'assistant', label: 'Asistent (vežbe)' }
];