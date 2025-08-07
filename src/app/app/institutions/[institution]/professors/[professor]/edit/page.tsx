import { getInstitution, getProfessor } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution, professor } = await params;

  const [
    institutionRes,
    professorRes
  ] = await Promise.all([
    getInstitution(institution),
    getProfessor(institution, professor)
  ]);

  return {
    title: `Uredjivanje '${professorRes.name}' - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: professorRes.bio
  }
}

export default async function ProfessorsEditPage({ params }: PageProps) {
  const { institution, professor } = await params;
  const professorRes = await getProfessor(institution, professor);
  return (
    <>{ professorRes.name } EDIT</>
  );
}