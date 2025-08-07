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

const typeObj: { value: string, label: string }[] = [
	{ value: 'primary', label: 'Osnovna škola' },
	{ value: 'high', label: 'Srednja škola' },
	{ value: 'faculty', label: 'Visokoobrazovna institucija' },
	{ value: 'other', label: 'Drugo/ne želim da navedem'}
]


const CreateInstitutionForm = () => {
  const router = useRouter();
  const { api, isLoading, error } = useApi();

  // const inputRef = useRef(null);
  const [ name, setName ] = useState<string>('');
  const [ typeOf, setTypeOf ] = useState<OptionType | null>(null);
  const [ dpt, setDpt ] = useState<string>('');
  const [ departments, setDepartments ] = useState<string[]>([]);

  const handleDepartments = (elem: any, key: string = 'Enter') => {
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
    try {

      const body: InstitutionCreateBody = {
        name, typeOf: typeOf?.value, departments
      }

      if (!isLoading) {
        const result = await api(() => ApiClient.createInstitution(body))
        setTimeout(() => {
          router.replace(`/institutions/${result._id}/edit`);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    } 
  }

  return (
    <CardContainer>
      <h1 className="text-xl font-bold py-5 text-center">Napravi grupu</h1>
      <div className="mb-4">
        <Input id="name" type="text" name="Naziv institucije ili grupe" inputVal={name} placeholder="Prirodno-matematički fakultet" setVal={(elem: any) => setName(elem.target.value)} />
      </div>
      <div className="mb-4 form-control">
        <label className="label-primary">Tip institucije ili grupe</label>
        <SelectComponent data={typeObj} placeholder="Izaberite instituciju" isClearable={false} isSearchable={false} setVal={(elem: any) => setTypeOf(elem)} />
      </div>
      <div className="mb-4 form-control">
        <label className="label-primary">Odseci, odeljenja itd.</label>
        <div className="w-full flex gap-1">
          {/* <input className="input-primary" ref={inputRef} id="dptID" type="text" placeholder="Odseci, odeljenja (enter za dodavanje)" onKeyUp={(elem) => handleDepartments(elem)} onChange={(elem) => setDpt(elem.target.value)} value={dpt} />
          <button aria-label="Dodaj odsek" className="btn-plus bg-primary" onClick={() => handleDepartments(inputRef.current, undefined)}>+</button> */}
        </div>
      </div>
      {
        departments.map((elem, i) => {
          return (
            <p key={i}>{ elem }</p>
            // <ListItem text={elem} index={i} deleteFunc={() => handleDeleteDepartment(i)} />
          );
        })
      }
      <div className="flex justify-end w-full mt-3">
        <button className="w-full md:w-1/2 lg:w-1/3 btn-primary btn-green" onClick={handleCreate} disabled={isLoading}>Napravi grupu!</button>
      </div>
      <p className="text-sm text-center my-4">Trebaš biti u grupi? <Link className="underline hover:no-underline" href='/app/institutions/join'>Pridruži se</Link></p>
    </CardContainer>
  );
}

export default CreateInstitutionForm;