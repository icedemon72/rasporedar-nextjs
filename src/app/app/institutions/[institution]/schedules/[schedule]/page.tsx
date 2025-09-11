import Schedule from "@/components/client/schedules/Schedule";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { SchedulesContextProvider } from "@/context/schedules-context";
import { getInstitution, getSchedule } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution, schedule } = await params;

  const [
    institutionRes,
    scheduleRes
  ] = await Promise.all([
    getInstitution(institution),
    getSchedule(institution, schedule)
  ]);

  return {
    title: `Raspored '${scheduleRes.title}' - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function SchedulePage({ params }: PageProps) {
  const { institution, schedule } = await params;
  const [
    institutionRes,
    scheduleRes
  ] = await Promise.all([
    getInstitution(institution),
    getSchedule(institution, schedule),
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
      <SchedulesContextProvider 
        institution={{
          ...institutionRes,
          subjects: []
        }}
      >
        <Schedule
          editable={false}
          schedule={scheduleRes}
        />
      </SchedulesContextProvider>
    </PageWrapper>
  );
}