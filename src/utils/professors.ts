export const generateFullProfessorName = (
  { title, name }: { title?: string; name: string }
): string => {
  return title 
    ? `${title} ${name}`
    : name;
}