import ScheduleCreateForm from "@/components/client/schedules/create/ScheduleCreateForm";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { SchedulesContextProvider } from "@/context/schedules-context";
import { guardRoleInInstitution } from "@/lib/auth/role-guard";
import { getInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;

  const institutionRes = await getInstitution(institution);

  await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

  return {
    title: `Dodaj raspored - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}


export default async function SchedulesCreatePage({ params }: PageProps) {
  const { institution } = await params;
  // await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

   await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

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
      <SchedulesContextProvider institution={institutionRes}>
        <ScheduleCreateForm />
      </SchedulesContextProvider>
    </PageWrapper>
  );
}