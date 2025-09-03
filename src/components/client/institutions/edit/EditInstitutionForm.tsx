'use client';

import { useApi } from '@/context/api-context';
import { OptionType } from '@/types/global';
import { addItemToArrayOnKey, deleteItemFromArray } from '@/utils/update-array';
import React, { useRef, useState, useEffect } from 'react';
import { InstitutionCreateBody } from '@/types/fetch';
import { useRouter } from 'next/navigation';
import CardContainer from '@/components/ui/containers/CardContainer';
import SelectComponent from '@/components/ui/SelectComponent';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { Plus, RefreshCcw, Save } from 'lucide-react';
import ListItem from '@/components/ui/lists/ListItem';
import ListContainer from '@/components/ui/lists/ListContainer';
import { toast } from 'react-toastify';
import { INSTITUTION_TYPES } from '@/constants/institutions';
import { Institution } from '@/types/data';
import CopyField from '@/components/ui/CopyField';

interface EditInstitutionFormProps {
  institution: Institution;
}

const EditInstitutionForm: React.FC<EditInstitutionFormProps> = ({
  institution
}) => {
  const router = useRouter();
  const { api, client, isLoading } = useApi();
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const [ name, setName ] = useState<string>('');
  const [ typeOf, setTypeOf ] = useState<OptionType | null>(null);
  const [ dpt, setDpt ] = useState<string>('');
  const [ departments, setDepartments ] = useState<string[]>([]);

  useEffect(() => {
    if (institution) {
      setName(institution.name || '');
      
      // Find the matching type option
      const foundType = INSTITUTION_TYPES.find(option => option.value === institution.typeOf);
      if (foundType) {
        setTypeOf(foundType);
      }
      
      setDepartments(institution.departments || []);
    }
  }, [institution]);

  const handleDepartments = (elem: any, key: string | null = 'Enter') => {
    const toAdd = addItemToArrayOnKey(departments, elem, key, true);
    if (toAdd.changed) {
      setDepartments(toAdd.result);
      setDpt('');
    }
  }

  const handleDeleteDepartment = (index: number) => {
    let tempDepartments = [...departments]; 
    const toDelete = deleteItemFromArray(tempDepartments, index);
    if (toDelete) {
      setDepartments(toDelete);
    }
  }

  const handleUpdate = async () => {
    const body: InstitutionCreateBody = {
      name, 
      typeOf: typeOf?.value, 
      departments
    }
    
    await api(
      () => client.updateInstitution(institution._id, body),
      {
        onSuccess(result) {
          toast.success('Grupa je uspešno ažurirana.');
          setTimeout(() => {
            router.refresh(); // Refresh to show updated data
          }, 1000);
        },
        onError(error) {
          toast.error('Greška prilikom ažuriranja grupe. ' + error?.message);
        },
      }
    );
  } 

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Input 
          id="name"
          type="text"
          name="Naziv institucije ili grupe" 
          inputVal={name}
          placeholder="Prirodno-matematički fakultet"
          setVal={setName} 
        />
      </div>
      <div className="mb-4 form-control">
        <label className="label-primary">Tip institucije ili grupe</label>
        <SelectComponent 
          data={INSTITUTION_TYPES} 
          placeholder="Izaberite instituciju" 
          isClearable={false}
          isSearchable={false} 
          isMulti={false}
          setVal={(e) => {
            setTypeOf(e as OptionType);
          }}
          value={typeOf}
         />
      </div>
      <div className="mb-4 form-control">
        <label className="label-primary">Odseci, odeljenja, grupe...</label>
        <div className="w-full flex gap-1 mb-4">
          <input
            className="input-primary"
            type="text"
            placeholder="Informatika OAS"
            value={dpt}
            ref={inputRef}
            onChange={(e) => setDpt(e.target.value)}
            onKeyUp={(e) => handleDepartments(dpt, e.key)}
          />
          <button
            type="button"
            className="btn-primary"
            onClick={() => handleDepartments(dpt, null)}
          >
            <Plus />
          </button>
        </div>
      </div>
      {
        departments.length > 0 && (
          <ListContainer>
            {departments.map((dep, i) => (
              <ListItem
                key={i}
                text={dep}
                index={i}
                deleteFunc={() => handleDeleteDepartment(i)}
              />
            ))}
          </ListContainer>
        )
      }

      <div>
        <label className="label-primary pb-2">Kodovi</label>
        <div className="flex justify-between">
          <div>
            <label className="label-primary">Kod za korisnike</label>
            <div className="flex gap-2">
              <CopyField text={institution.code!} />
              <button className="btn-primary"><RefreshCcw /></button>
            </div>
          </div>
          <div>
            <label className="label-primary">Kod za moderatore</label>
            <div className="flex gap-2">
              <CopyField text={institution.moderatorCode!} />
              <button className="btn-primary"><RefreshCcw /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <button 
          type="submit" 
          className="w-full lg:w-auto btn-primary px-4 my-4"
          onClick={() => handleUpdate()}
        >
          <Save />
          Sačuvaj izmene
        </button>
      </div>
    </div>
  );
}

export default EditInstitutionForm;