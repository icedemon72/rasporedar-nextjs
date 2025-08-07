import CreateProfessorForm from "@/components/client/professors/create/CreateProfessorForm";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;

  const institutionRes = await getInstitution(institution);

  return {
    title: `Dodaj profesora - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function ProfessorsCreatePage({ params }: PageProps) {
  const { institution } = await params;

  const institutionData = await getInstitution(institution);

  return (
    <PageWrapper
      title={'Dodaj profesora'}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionData.name, url: `/app/institutions/${institution}` },
          { label: 'Profesori', url: `/app/institutions/${institution}/professors` },
          { label: 'Dodaj profesora' },
        ]
      }}
    >
      <CreateProfessorForm />
    </PageWrapper>
  );
}