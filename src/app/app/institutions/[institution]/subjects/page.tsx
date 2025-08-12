import SubjectDeleteButton from "@/components/client/subjects/SubjectDeleteButton";
import EditButton from "@/components/ui/buttons/EditButton";
import ViewButton from "@/components/ui/buttons/ViewButton";
import SearchInput from "@/components/ui/SearchInput";
import Table from "@/components/ui/table/Table";
import TableCell from "@/components/ui/table/TableCell";
import TableRow from "@/components/ui/table/TableRow";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { includesRole } from "@/lib/auth/role-guard";
import { getInstitution, getInstitutionSubjects, getRoleInInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";
import { Plus } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;

  const institutionRes = await getInstitution(institution);

  return {
    title: `Predmeti - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex,nofollow'
  }
}

export default async function SubjectsPage({ params, searchParams }: PageProps) {
  const { institution } = await params;
  const { search } = await searchParams;

  const [
    subjects,
    institutionData,
    role
  ] = await Promise.all([
    getInstitutionSubjects(institution),
    getInstitution(institution),
    getRoleInInstitution(institution)
  ]);

  const subjectsData = search
    ? subjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : subjects;

  return (
   <PageWrapper
      title={'Predmeti'}
      subtitle={`Ovde možeš videti listu svih predmeta u grupi '${institutionData.name}'`}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionData.name, url: `/app/institutions/${institution}` },
          { label: 'Predmeti' },
        ]
      }}
    >
      <div className="flex flex-1 justify-between">
        <SearchInput placeholder="Pretraži predmete..." />
        {
          includesRole(role, ['Owner', 'Moderator']) && (
            <Link href={`/app/institutions/${institution}/subjects/create`} className="w-full md:w-auto btn-primary px-8">
              <Plus />
              Dodaj predmet
            </Link>
          )
        }
      </div>
      <Table>
        <TableRow header>
          <TableRow>
            <TableCell header>#</TableCell>
            <TableCell header>Naziv predmeta</TableCell>
            <TableCell header>Akcije</TableCell>
          </TableRow>
        </TableRow>
        <tbody>
          {
            subjectsData.map((subject, index) => (
              <TableRow key={subject._id}>
                <TableCell>{ index + 1}</TableCell>
                <TableCell>
                  <Link href={`/app/institutions/${institution}/subjects/${subject._id}`}>
                    { subject.name }
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ViewButton link={`/app/institutions/${institution}/subjects/${subject._id}`} />
                     {
                        includesRole(role, ['Owner', 'Moderator']) && (
                          <>
                            <EditButton link={`/app/institutions/${institution}/subjects/${subject._id}/edit`} />
                            <SubjectDeleteButton subject={subject} />
                          </>
                        )
                      }
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </tbody>
      </Table>
    </PageWrapper>
  );
}