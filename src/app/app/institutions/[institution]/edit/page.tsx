import EditInstitutionForm from "@/components/client/institutions/edit/EditInstitutionForm";
import InstitutionDeleteButton from "@/components/client/institutions/edit/InstitutionDeleteButton";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { guardRoleInInstitution } from "@/lib/auth/role-guard";
import { getInstitution } from "@/lib/fetch/server";
import { Institution } from "@/types/data";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;
  const institutionRes = await getInstitution(institution);

  await guardRoleInInstitution(institution, ['Owner']);

  return {
    title: `Uredjivanje '${institutionRes.name}' | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function InstitutionEditPage({ params }: PageProps) {
  const { institution } = await params;

  await guardRoleInInstitution(institution, ['Owner']);

  const institutionRes = await getInstitution(institution, {}, { code: true });

  return (
    <PageWrapper 
      title={`Uredi grupu '${institutionRes.name}'`}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionRes.name, url: `/app/institutions/${institution}` },
          { label: 'Uredi' },
        ]
      }}
    >
      <div className="flex justify-end">
        <InstitutionDeleteButton institution={institutionRes} />
      </div>

      <EditInstitutionForm institution={institutionRes} />
    </PageWrapper>
  );
}
