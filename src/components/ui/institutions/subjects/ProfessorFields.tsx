import { Professor } from '@/types/data';
import { generateFullProfessorName } from '@/utils/professors';
import React from 'react';
import ViewButton from '../../buttons/ViewButton';
import Link from 'next/link';
import Table from '../../table/Table';
import TableRow from '../../table/TableRow';
import TableCell from '../../table/TableCell';

interface ProfessorFieldsProp {
  institution: string;
  professors: Partial<Professor>[];
}

export const ProfessorFields: React.FC<ProfessorFieldsProp> = ({
  professors,
  institution
}) => {
  return (
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
          professors.map((professor, index) => {
            const professorName = generateFullProfessorName({ name: professor.name!, title: professor.title });
            const professorLink = `/app/institutions/${institution}/professors/${professor._id}`;
            
            return (
              <TableRow key={index}>
                <TableCell>{ index + 1} </TableCell>
                <TableCell>
                  <div className="flex">
                    <Link href={professorLink}>
                      { professorName }
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <ViewButton link={professorLink} />
                </TableCell>
              </TableRow>
            )
          })
        }
      </tbody>
    </Table>
  );
}