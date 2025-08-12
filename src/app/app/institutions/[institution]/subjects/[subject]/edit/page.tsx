import EditSubjectForm from "@/components/client/subjects/edit/EditSubjectForm";
import SubjectDeleteEditButton from "@/components/client/subjects/edit/SubjectDeleteEditButton";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { guardRoleInInstitution, includesRole } from "@/lib/auth/role-guard";
import { getInstitution, getInstitutionProfessors, getRoleInInstitution, getSubject } from "@/lib/fetch/server";
import { Institution, Subject } from "@/types/data";
import { PageProps } from "@/types/page";

export async function generateMetadata({ params }: PageProps) {
  const { institution, subject } = await params;

  await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

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

  await guardRoleInInstitution(institution, ['Owner', 'Moderator']);

  const [
    subjectRes,
    professors,
    institutionRes,
    role
  ] = await Promise.all([
    getSubject(institution, subject),
    getInstitutionProfessors(institution),
    getInstitution(institution),
    getRoleInInstitution(institution)
  ]);

  return (
    <PageWrapper
      title={`Uredi predmet '${subjectRes.name}'`}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionRes.name, url: `/app/institutions/${institution}` },
          { label: 'Predmeti', url: `/app/institutions/${institution}/subjects` },
          { label: subjectRes.name,  url: `/app/institutions/${institution}/subjects/${subjectRes._id}` },
          { label: 'Uredi' },
        ]
      }}
    >
      {
        includesRole(role, ['Owner', 'Moderator']) && (
          <div className="flex justify-end">
            <SubjectDeleteEditButton subject={subjectRes} />
          </div>
        )
      }
      <EditSubjectForm professors={professors} subject={subjectRes} />
    </PageWrapper>
  );
}