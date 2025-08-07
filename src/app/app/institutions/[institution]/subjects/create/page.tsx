import CreateSubjectForm from "@/components/client/subjects/create/CreateSubjectForm";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;

  const institutionRes = await getInstitution(institution);

  return {
    title: `Dodaj predmet - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function SubjectsCreatePage({ params }: PageProps) {
  const { institution } = await params;
  
  const institutionData = await getInstitution(institution);
  
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
      <CreateSubjectForm />
    </PageWrapper>
  );
}