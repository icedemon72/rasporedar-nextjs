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
    title: `Uredjivanje rasporeda '${scheduleRes.title}' - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function ScheduleEditPage({ params }: PageProps) {
  const { institution, schedule } = await params;
  const scheduleRes = await getSchedule(institution, schedule);
  
  return (
    <>{scheduleRes.title} EDIT</>
  );
}