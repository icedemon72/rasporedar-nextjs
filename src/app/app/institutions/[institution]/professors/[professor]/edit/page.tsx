import EditProfessorForm from "@/components/client/professors/edit/EditProfessorForm";
import ProfessorDeleteEditButton from "@/components/client/professors/edit/ProfessorDeleteEditButton";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { guardRoleInInstitution, includesRole } from "@/lib/auth/role-guard";
import { getInstitution, getProfessor, getRoleInInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";
import { generateFullProfessorName } from "@/utils/professors";

export async function generateMetadata({ params }: PageProps) {
  const { institution, professor } = await params;

  await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

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

  await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

  const [
    professorRes,
    institutionRes,
    role
  ] = await Promise.all([
    getProfessor(institution, professor),
    getInstitution(institution),
    getRoleInInstitution(institution)
  ]);
  
  const professorName = generateFullProfessorName({ name: professorRes.name, title: professorRes.title })

  return (
     <PageWrapper 
      title={`Uredi profesora '${professorName}'`}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionRes.name, url: `/app/institutions/${institution}` },
          { label: 'Profesori', url: `/app/institutions/${institution}/professors` },
          { label: professorName, url: `/app/institutions/${institution}/professors/${professorRes._id}` },
          { label: 'Uredi' }
        ]
      }}
    >
      {
        includesRole(role, ['Owner', 'Moderator']) && (
          <div className="flex justify-end">
            <ProfessorDeleteEditButton professor={professorRes} />
          </div>
        )
      }
      <EditProfessorForm professorData={professorRes} />

    </PageWrapper>
  );
}