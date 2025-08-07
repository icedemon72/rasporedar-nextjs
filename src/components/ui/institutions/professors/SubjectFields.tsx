import React from 'react';
import { Subject } from '@/types/data';
import ViewButton from '../../buttons/ViewButton';
import Link from 'next/link';
import Table from '../../table/Table';
import TableRow from '../../table/TableRow';
import TableCell from '../../table/TableCell';

interface SubjectFieldsProp {
  institution: string;
  subjects: Partial<Subject>[];
}

export const SubjectFields: React.FC<SubjectFieldsProp> = ({
  subjects,
  institution
}) => {
  return (
    <Table>
        <TableRow header>
          <TableRow>
            <TableCell header>#</TableCell>
            <TableCell header>Naziv</TableCell>
            <TableCell header>Akcije</TableCell>
          </TableRow>
        </TableRow>
      <tbody>
        {
          subjects.map((subject, index) => {
            const subjectLink = `/app/institutions/${institution}/subjects/${subject._id}`;
            
            return (
              <TableRow key={index}>
                <TableCell>{ index + 1} </TableCell>
                <TableCell>
                  <div className="flex">
                    <Link href={subjectLink}>
                      { subject.name }
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <ViewButton link={subjectLink} />
                </TableCell>
              </TableRow>
            )
          })
        }
      </tbody>
    </Table>
  );
}