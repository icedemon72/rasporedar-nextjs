import CreateSubjectForm from "@/components/client/subjects/create/CreateSubjectForm";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { guardRoleInInstitution } from "@/lib/auth/role-guard";
import { getInstitution, getInstitutionProfessors } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;

  await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

  const institutionRes = await getInstitution(institution);

  return {
    title: `Dodaj predmet - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function SubjectsCreatePage({ params }: PageProps) {
  const { institution } = await params;

  await guardRoleInInstitution(institution, ['Owner', 'Moderator']);
  
  const [
    institutionData,
    professors
  ] = await Promise.all([
    getInstitution(institution),
    getInstitutionProfessors(institution)
  ])

  
  return (
    <PageWrapper
      title={'Dodaj predmet'}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionData.name, url: `/app/institutions/${institution}` },
          { label: 'Predmeti', url: `/app/institutions/${institution}/subjects` },
          { label: 'Dodaj predmet' },
        ]
      }}
    >
      <CreateSubjectForm professors={professors} institution={institution} />
    </PageWrapper>
  );
}