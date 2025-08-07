import InstitutionCard from "@/components/ui/institutions/InstitutionCard";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { fetchWithAuthServer } from "@/lib/auth/auth-server";
import { Institution } from "@/types/data";
import Link from "next/link";

export default async function InstitutionsPage() {
  const res = await fetchWithAuthServer('/user_institutions')
  const institutions: Institution[] = await res.json()
  
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
