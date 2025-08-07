import { getInstitution, getInstitutionSchedules } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";
import Link from "next/link";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;

  const institutionRes = await getInstitution(institution);

  return {
    title: `Rasporedi - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function SchedulesPage({ params }: PageProps) {
  const { institution } = await params;

  const schedules = await getInstitutionSchedules(institution);
  
  return (
    <>
      {
        schedules.map((schedule, index) => (
          <Link key={index} href={`/app/institutions/${institution}/schedules/${schedule._id}`}>{ schedule.title }</Link>
        ))
      }
    </>
  );
}