import ScheduleDeleteButton from "@/components/client/schedules/ScheduleDeleteButton";
import EditButton from "@/components/ui/buttons/EditButton";
import ViewButton from "@/components/ui/buttons/ViewButton";
import SearchInput from "@/components/ui/SearchInput";
import Table from "@/components/ui/table/Table";
import TableCell from "@/components/ui/table/TableCell";
import TableRow from "@/components/ui/table/TableRow";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { includesRole } from "@/lib/auth/role-guard";
import { getInstitution, getInstitutionSchedules, getRoleInInstitution } from "@/lib/fetch/server";
import { PageProps } from "@/types/page";
import { formatDate } from "@/utils/date";
import { Plus } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: PageProps) {
  const { institution } = await params;

  const institutionRes = await getInstitution(institution);

  return {
    title: `Rasporedi - ${institutionRes.name} | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function SchedulesPage({ params }: PageProps) {
  const { institution } = await params;

  const [
    role,
    institutionData
  ]= await Promise.all([
    getRoleInInstitution(institution),
    getInstitution(institution)
  ]);

  const schedules = await getInstitutionSchedules(institution, {}, {
    // active: role !== 'User'
  });
  

  return (
    <PageWrapper
      title={'Rasporedi'}
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moje grupe', url: '/app/institutions'  },
          { label: institutionData.name, url: `/app/institutions/${institution}` },
          { label: 'Rasporedi' },
        ]
      }}
    >
      <div className="flex flex-1 justify-between">
        <SearchInput placeholder="Pretraži rasporede..." /> 
        {
          includesRole(role, ['Owner', 'Moderator']) && (
            <Link href={`/app/institutions/${institution}/schedules/create`} className="w-full md:w-auto btn-primary px-8">
              <Plus />
              Dodaj raspored
            </Link>
          )
        }
      </div>
      <Table>
         <TableRow header>
            <TableRow>
              <TableCell header>#</TableCell>
              <TableCell header>Naslov rasporeda</TableCell>
              <TableCell header>Važenje</TableCell>
              <TableCell header>Akcije</TableCell>
            </TableRow>
          </TableRow>
          <tbody>
             {
              schedules.map((schedule, index) => (
                <TableRow key={schedule._id}>
                  <TableCell>{ index + 1}</TableCell>
                  <TableCell>
                    <Link key={index} href={`/app/institutions/${institution}/schedules/${schedule._id}`}>{ schedule.title }</Link>
                  </TableCell>
                  <TableCell>{ formatDate(schedule.validFrom) } - { formatDate(schedule.validUntil) }</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                    <ViewButton link={`/app/institutions/${institution}/schedules/${schedule._id}`} />
                    {
                      includesRole(role, ['Owner', 'Moderator']) && (
                        <>
                          <EditButton link={`/app/institutions/${institution}/schedules/${schedule._id}/edit`} />
                          <ScheduleDeleteButton schedule={schedule} />
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