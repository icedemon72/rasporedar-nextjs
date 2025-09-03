import InstitutionCards from "@/components/client/institutions/InstitutionCards";
import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";
import { BookOpen, Calendar, UserCog, Users } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;
  const institutionRes = await getInstitution(institution);

  const title = `${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`;
  const robots = 'noindex,nofollow';

  return {
    title,
    robots
  }
}

export default async function InstitutionPage({ params }: PageProps) {
  const { institution } = await params;
  const institutionRes = await getInstitution(institution);
  
  console.log(institutionRes);

  if (!institutionRes) return notFound();

  return (
    <PageWrapper
      title={institutionRes.name}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: institutionRes.name }
        ],
      }}
    >
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Korisni linkovi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            href={`/app/institutions/${institution}/subjects`}
            title="Predmeti"
            description="Pronadji sve predmete dostupne u ovoj instituciji."
            icon={<BookOpen className="w-6 h-6" />}
          />
          <DashboardCard
            href={`/app/institutions/${institution}/professors`}
            title="Profesori"
            description="Pogledaj spisak profesora povezanih sa predmetima."
            icon={<Users className="w-6 h-6" />}
          />
          <DashboardCard
            href={`/app/institutions/${institution}/schedules`}
            title="Rasporedi"
            description="Pregledaj termine nastave i druge rasporede."
            icon={<Calendar className="w-6 h-6" />}
          />
          <DashboardCard
            href={`/app/institutions/${institution}/users`}
            title="Korisnici"
            description="Vidi ko je deo ove grupe."
            icon={<UserCog className="w-6 h-6" />}
          />

          <InstitutionCards institution={institutionRes} />
          
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Aktivni rasporedi</h2>
          <p>Hm... izgleda da nema aktivnih rasporeda</p>
        </div>
      </div>
    </PageWrapper>
  );
}
