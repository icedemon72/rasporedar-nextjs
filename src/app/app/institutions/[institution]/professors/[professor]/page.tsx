import CollapsibleField from "@/components/ui/CollapsibleField";
import FilledInput from "@/components/ui/FilledInput";
import ProfessorEducationField from "@/components/ui/institutions/professors/ProfessorEducationField";
import { SubjectFields } from "@/components/ui/institutions/professors/SubjectFields";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { includesRole } from "@/lib/auth/role-guard";
import { getInstitution, getProfessor, getProfessorSubjects, getRoleInInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";
import { generateFullProfessorName } from "@/utils/professors";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: PageProps) {
  const { institution, professor } = await params;

  const [
    institutionRes,
    professorRes
  ] = await Promise.all([
    getInstitution(institution),
    getProfessor(institution, professor)
  ]);

  const professorTitle =generateFullProfessorName({ name: professorRes.name, title: professorRes.title })

  return {
    title: `${professorTitle}${professorRes.name} - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: professorRes.bio
  }
}

export default async function ProfessorsSlugPage({ params }: PageProps) {
  const { institution, professor } = await params;
  
  const [
    professorRes,
    institutionRes,
    subjects,
    role
  ] = await Promise.all([
    getProfessor(institution, professor),
    getInstitution(institution),
    getProfessorSubjects(institution, professor),
    getRoleInInstitution(institution)
  ]);

  const professorName = generateFullProfessorName({ name: professorRes.name, title: professorRes.title })

  return (
    <PageWrapper 
      title={professorName}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionRes.name, url: `/app/institutions/${institution}` },
          { label: 'Profesori', url: `/app/institutions/${institution}/professors` },
          { label: professorName },
        ]
      }}
    >
      {
        includesRole(role, ['Owner', 'Moderator']) && (
          <div className="flex justify-end">
            <Link href={`/app/institutions/${institution}/professors/${professorRes._id}/edit`} className="w-full md:w-auto btn-primary px-8">
              <Edit />
              Uredi profesora
            </Link>
          </div>
        )
      }
      <CollapsibleField label="Stručna biografija" data={professorRes.bio} />
      <ProfessorEducationField label="Osnovne studije" value={professorRes.education?.bachelor} />
      <ProfessorEducationField label="Master studije" value={professorRes.education?.master} />
      <ProfessorEducationField label="Doktorske studije" value={professorRes.education?.doctorate} />
      <CollapsibleField label="Reference" data={professorRes.references.join('\n\n')} isOpen={false} />
    
      {
        subjects?.professor?.length ? (
          <div className="form-control">
            <p className="label-primary">Profesor na predmetu</p>
            <SubjectFields institution={institution} subjects={subjects.professor}/>
            </div>
        ) : null
      }
      {
        subjects?.assistent?.length ? (
          <div className="form-control">
            <p className="label-primary">Asistent na predmetu</p>
            <SubjectFields institution={institution} subjects={subjects.assistent}/>
            </div>
        ) : null
      }
    </PageWrapper>
  );
}