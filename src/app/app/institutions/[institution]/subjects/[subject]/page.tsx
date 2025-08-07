import CollapsibleField from "@/components/ui/CollapsibleField";
import { ProfessorFields } from "@/components/ui/institutions/subjects/ProfessorFields";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getInstitution, getSubject } from "@/lib/fetch/server";
import { Institution, Professor, Subject } from "@/types/data";
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
    title: `${subjectRes.name} - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function SubjectPage({ params }: PageProps) {
  const { institution, subject } = await params;

  const [
    subjectRes,
    institutionRes
  ] = await Promise.all([
    getSubject(institution, subject, { fullInfo: true }),
    getInstitution(institution)
  ]);

  console.log(subjectRes);

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