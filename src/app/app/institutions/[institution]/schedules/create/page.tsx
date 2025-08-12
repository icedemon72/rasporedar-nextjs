import PageWrapper from "@/components/wrappers/PageWrapper";
import { getInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";

export default async function SchedulesCreatePage({ params }: PageProps) {
  const { institution } = await params;
  // await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

  const [
    institutionRes
  ] = await Promise.all([
      getInstitution(institution)
  ]);

  return (
    <PageWrapper 
      title={`Dodaj novi raspored`}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionRes.name, url: `/app/institutions/${institution}` },
          { label: 'Rasporedi', url: `/app/institutions/${institution}/schedules` },
          { label: 'Novi Raspored' }
        ]
      }}
    >
      Schedules Create Page
    </PageWrapper>
  );
}