import CollapsibleField from "@/components/ui/CollapsibleField";
import { ProfessorFields } from "@/components/ui/institutions/subjects/ProfessorFields";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { includesRole } from "@/lib/auth/role-guard";
import { getInstitution, getRoleInInstitution, getSubject } from "@/lib/fetch/server";
import { Institution, Professor, Subject } from "@/types/data";
import { PageProps } from "@/types/page";
import { Edit } from "lucide-react";
import Link from "next/link";

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
    title: `${subjectRes.name} - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function SubjectPage({ params }: PageProps) {
  const { institution, subject } = await params;

  const [
    subjectRes,
    institutionRes,
    role
  ] = await Promise.all([
    getSubject(institution, subject, { fullInfo: true }),
    getInstitution(institution),
    getRoleInInstitution(institution)
  ]);

  return (
    <PageWrapper
      title={subjectRes.name}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionRes.name, url: `/app/institutions/${institution}` },
          { label: 'Predmeti', url: `/app/institutions/${institution}/subjects` },
          { label: subjectRes.name },
        ]
      }}
    >
      {
        includesRole(role, ['Owner', 'Moderator']) && (
          <div className="flex justify-end">
            <Link href={`/app/institutions/${institution}/subjects/${subjectRes._id}/edit`} className="w-full md:w-auto btn-primary px-8">
              <Edit />
              Uredi predmet
            </Link>
          </div>
        )
      }
      <CollapsibleField label="Opis predmeta" data={subjectRes.description} />
      <CollapsibleField label="Cilj predmeta" data={subjectRes.goal} />
      <CollapsibleField label="Rezultat predmeta" data={subjectRes.result} />
      
      <div className="form-control">
        <p className="label-primary">Profesori na predmetu</p>
        <ProfessorFields 
          institution={institution}
          professors={subjectRes.professors as Partial<Professor>[]}
        /> 
      </div>

      {
        subjectRes.assistents.length ? (
          <div className="form-control">
            <p className="label-primary">Asistenti na predmetu</p>
            <ProfessorFields 
              institution={institution}
              professors={subjectRes.assistents as Partial<Professor>[]}
            /> 
          </div>
        ) : null
      }

    </PageWrapper>
  );
}