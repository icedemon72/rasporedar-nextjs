import InstitutionCard from "@/components/ui/institutions/InstitutionCard";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getUserInstitutions } from "@/lib/fetch/server";

export async function generateMetadata() {
  return {
    title: `Moje grupe | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function InstitutionsPage() {
  const institutions = await getUserInstitutions();

  return (
    <PageWrapper
      title={'Moje grupe'}
      breadcrumbs={{
        links: [
        { label: 'Panel', url: '/app' },
        { label: 'Moje grupe'  },
        ]
      }}
      className="bg-transparent border-none"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {
          institutions.map((institution, index) => (
            <InstitutionCard institution={institution} key={index} />
          ))
        }
      </div>
    </PageWrapper>
  );
}
