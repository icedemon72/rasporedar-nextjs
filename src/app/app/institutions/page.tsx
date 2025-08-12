import InstitutionCard from "@/components/ui/institutions/InstitutionCard";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getUserInstitutions } from "@/lib/fetch/server";
import { Institution } from "@/types/data";
import Link from "next/link";

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
