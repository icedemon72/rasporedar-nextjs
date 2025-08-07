import { getInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";

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
  
  return (
    <>{ institutionRes.name }</>
  );
}
