'use client'

import React, { useRef, useState } from 'react';
import Input from '@/components/ui/Input';
import SelectComponent from '@/components/ui/SelectComponent';
import { useScheduleContext } from '@/context/schedules-context';
import { OptionType } from '@/types/global';
import { SCHEDULE_FREQUENCIES, SCHEDULE_STYLES, SCHEDULE_TYPES,  } from '@/constants/schedule';
import { useScheduleSelectField } from '@/hooks/use-schedule-select-field';
import { addItemToArrayOnKey, deleteItemFromArray } from '@/utils/update-array';
import { Plus } from 'lucide-react';
import ListContainer from '@/components/ui/lists/ListContainer';
import ListItem from '@/components/ui/lists/ListItem';

const ScheduleStepOne = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { schedule, institution, handleChange, handleDeleteGroup: deleteGroup } = useScheduleContext();

  const departmentField = useScheduleSelectField('department', institution.departments.map(d => ({ value: d, label: d })));
  const systemTypeField = useScheduleSelectField('systemType', SCHEDULE_TYPES, SCHEDULE_TYPES[0]);
  const styleField = useScheduleSelectField('style', SCHEDULE_STYLES, SCHEDULE_STYLES[0]);
  const frequencyField = useScheduleSelectField('frequency', SCHEDULE_FREQUENCIES, SCHEDULE_FREQUENCIES[0]);

  const [ group, setGroup ] = useState<string>('');

  const handleGroups = (elem: any, key: string | null = 'Enter') => {
    const toAdd = addItemToArrayOnKey(schedule.groups ?? [], elem, key, true);
    if (toAdd.changed) {
      handleChange('groups')(toAdd.result);
      setGroup('');
    }
  }

  const handleDeleteGroup = (index: number) => {
    let temp = [ ...schedule.groups as string[] ]; 
    const toDelete = deleteItemFromArray(temp, index);
    if (toDelete) {
      handleChange('groups')(toDelete);
      deleteGroup(index);
    }
  }

  if (!schedule) return null;
  
  return (
    <div className="space-y-4 mb-4">
      <Input
        id="title"
        name="Naslov rasporeda"
        inputVal={schedule.title ?? ''}
        setVal={handleChange('title')}
        placeholder="Raspored predavanja i vežbi"
      />

      <Input
        id="subtitle"
        name="Podnaslov rasporeda"
        inputVal={schedule.subtitle ?? ''}
        setVal={handleChange('subtitle')}
        placeholder="Raspored na odseku za informatiku u letnjem semestru 2024/25"
      />

      <Input
        id="comment"
        name="Komentar nakon rasporeda"
        inputVal={schedule.comment ?? ''}
        setVal={handleChange('comment')}
        placeholder="Nastava po ovom rasporedu održavaće se svake dve nedelje"
      />

      <div>
        <label className="label-primary">Odsek, razred, odeljenje...</label>
        <SelectComponent
          data={institution.departments.map((department) => ({
            value: department, label: department
          }))}
          placeholder={`Izaberite ${institution.typeOf === 'school' ? 'razred, odeljenje' : 'odsek, katedru'}`}
          value={departmentField.value}
          setVal={(newValue) => departmentField.onChange(newValue as OptionType)}
          isMulti={false}
          required={true}
        />
      </div>

      <div className="flex flex-1 gap-2">
        <div className='w-full'>
          <label className="label-primary">Tip rasporeda</label>
          <SelectComponent
            data={SCHEDULE_TYPES}
            placeholder={`Izaberite tip rasporeda`}
            value={systemTypeField.value}
            setVal={(newValue) => systemTypeField.onChange(newValue as OptionType)}
            isMulti={false}
            required={true}
            isClearable={false}
          />
        </div>
        <div className='w-full'>
          <label className="label-primary">Stil rasporeda</label>
          <SelectComponent
            data={SCHEDULE_STYLES}
            placeholder={`Izaberite stil rasporeda`}
            value={styleField.value}
            setVal={(newValue) => styleField.onChange(newValue as OptionType)}
            isMulti={false}
            required={true}
            isClearable={false}
          />
        </div>
      </div>

      <div>
        <label htmlFor="groups" className="label-primary">Grupe</label>
        <div className="w-full flex gap-1">
          <input
            id="groups"
            className="input-primary"
            type="text"
            placeholder="Informatika OAS"
            value={group}
            ref={inputRef}
            onChange={(e) => setGroup(e.target.value)}
            onKeyUp={(e) => handleGroups(group, e.key)}
          />
          <button
            type="button"
            className="btn-primary"
            onClick={() => handleGroups(group, null)}
          >
            <Plus />
          </button>
        </div>
      </div>

      {
        schedule.groups && schedule.groups.length > 0 && (
          <ListContainer>
            {schedule.groups.map((group, i) => (
              <ListItem
                key={i}
                text={group}
                index={i}
                deleteFunc={() => handleDeleteGroup(i)}
              />
            ))}
          </ListContainer>
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        <div className="col-span-1">
          <Input
            id="validFrom"
            name="Važi od"
            inputVal={schedule.validFrom ?? ''}
            setVal={handleChange('validFrom')}
            type="date"
          />
        </div>
        <div className="col-span-1">
          <Input
            id="validUntil"
            name="Važi do"
            inputVal={schedule.validUntil ?? ''}
            setVal={handleChange('validUntil')}
            type="date"
          />
        </div>
        <div className="col-span-1 flex flex-col justify-center gap-1">
          <label className="label-primary">Važi na</label>
          <SelectComponent
            data={SCHEDULE_FREQUENCIES}
            placeholder={`Izaberite na koliko će raspored važiti`}
            value={frequencyField.value}
            setVal={(newValue) => frequencyField.onChange(newValue as OptionType)}
            isMulti={false}
            required={true}
            isClearable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleStepOne;