import { getInstitution, getSubject } from "@/lib/fetch/server";
import { Institution, Subject } from "@/types/data";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution, subject } = await params;

  const [
    institutionRes,
    subjectRes
  ] = await Promise.all([
    getInstitution(institution),
    getSubject(institution, subject)
  ]);
  
  return {
    title: `Uredjivanje '${subjectRes.name}' - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function SubjectEditPage({ params }: PageProps) {
  const { institution, subject } = await params;

  const subjectRes = await getSubject(institution, subject);

  return (
    <>{ subjectRes.name }</>
  );
}