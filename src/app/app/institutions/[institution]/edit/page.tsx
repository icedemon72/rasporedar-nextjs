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

  const institutionRes = await getInstitution(institution);

  return (
    <>{ institutionRes.name }</>
  );
}
