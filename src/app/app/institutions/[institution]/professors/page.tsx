import EditButton from "@/components/ui/buttons/EditButton";
import ViewButton from "@/components/ui/buttons/ViewButton";
import Table from "@/components/ui/table/Table";
import TableCell from "@/components/ui/table/TableCell";
import TableRow from "@/components/ui/table/TableRow";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getInstitution, getInstitutionProfessors } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";
import { Plus } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;

  const institutionRes = await getInstitution(institution);

  return {
    title: `Profesori - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function ProfessorsPage({ params }: PageProps) {
  const { institution } = await params;

  const [ 
    institutionData,
    professors
  ] = await Promise.all([
    getInstitution(institution),
    getInstitutionProfessors(institution)
  ]);

  return (
    <PageWrapper
      title={'Profesori'}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionData.name, url: `/app/institutions/${institution}` },
          { label: 'Profesori' },
        ]
      }}
    >
       <div className="flex flex-1 justify-between">
        <input />
        <Link href={`/app/institutions/${institution}/professors/create`} className="w-full md:w-auto btn-primary px-8">
          <Plus />
          Dodaj profesora
        </Link>
      </div>
      <Table>
        <TableRow header>
          <TableRow>
            <TableCell header>#</TableCell>
            <TableCell header>Ime i prezime</TableCell>
            <TableCell header>Akcije</TableCell>
          </TableRow>
        </TableRow>
        <tbody>
          {
            professors.map((professor, index) => (
              <TableRow key={professor._id}>
                <TableCell>{ index + 1}</TableCell>
                <TableCell>
                  <Link href={`/app/institutions/${institution}/professors/${professor._id}`}>
                    { professor.title } { professor.name }
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ViewButton link={`/app/institutions/${institution}/professors/${professor._id}`} />
                    <EditButton link={`/app/institutions/${institution}/professors/${professor._id}/edit`} />
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