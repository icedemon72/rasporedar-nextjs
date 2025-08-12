'use client';

import { useApi } from '@/context/api-context';
import { OptionType } from '@/types/global';
import { addItemToArrayOnKey, deleteItemFromArray } from '@/utils/update-array';
import { ApiClient } from '@/lib/fetch/api-client';
import React, { useRef, useState } from 'react';
import { InstitutionCreateBody } from '@/types/fetch';
import { useRouter } from 'next/navigation';
import CardContainer from '@/components/ui/containers/CardContainer';
import SelectComponent from '@/components/ui/SelectComponent';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ListItem from '@/components/ui/lists/ListItem';
import ListContainer from '@/components/ui/lists/ListContainer';
import { toast } from 'react-toastify';

const typeObj: { value: string, label: string }[] = [
	{ value: 'primary', label: 'Osnovna škola' },
	{ value: 'high', label: 'Srednja škola' },
	{ value: 'faculty', label: 'Visokoobrazovna institucija' },
	{ value: 'other', label: 'Drugo/ne želim da navedem'}
]


const CreateInstitutionForm = () => {
  const router = useRouter();
  const { api, client, isLoading } = useApi();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ name, setName ] = useState<string>('');
  const [ typeOf, setTypeOf ] = useState<OptionType | null>(null);
  const [ dpt, setDpt ] = useState<string>('');
  const [ departments, setDepartments ] = useState<string[]>([]);

  const handleDepartments = (elem: any, key: string | null = 'Enter') => {
    const toAdd = addItemToArrayOnKey(departments, elem, key, true);
    if(toAdd.changed) {
      setDepartments(toAdd.result);
      setDpt('');
    }
  }

  const handleDeleteDepartment = (index: number) => {
    let tempDepartments = [ ...departments ]; 
    const toDelete = deleteItemFromArray(tempDepartments, index);
    if(toDelete) {
      setDepartments(toDelete);
    }
  }

  const handleCreate = async () => {
    const body: InstitutionCreateBody = {
      name, typeOf: typeOf?.value, departments
    }
    
    await api(
      () => client.createInstitution(body),
      {
        onSuccess(result) {
          toast.success('Grupa je uspešno kreirana.');
          setTimeout(() => {
            router.push(`/app/institutions/${result._id}/edit`);
          }, 1000);
        },
        onError(error) {
          toast.error('Greška prilikom kreiranja grupe. ' + error?.message);
        },
      }
    );
  } 

  return (
    <CardContainer>
      <h1 className="text-xl font-bold py-5 text-center">Napravi grupu</h1>
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
          data={typeObj} 
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
      <div className="flex justify-end w-full mt-3">
        <button className="w-full md:w-1/2 lg:w-1/3 btn-primary" onClick={handleCreate} disabled={isLoading}>Napravi grupu!</button>
      </div>
      <p className="text-sm text-center my-4">Trebaš biti u grupi? <Link className="underline hover:no-underline" href='/app/institutions/join'>Pridruži se</Link></p>
    </CardContainer>
  );
}

export default CreateInstitutionForm;