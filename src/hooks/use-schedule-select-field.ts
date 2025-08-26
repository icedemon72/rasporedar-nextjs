'use client';

import { useEffect, useState } from 'react';
import { OptionType } from '@/types/global';
import { useScheduleContext } from '@/context/schedules-context';
import { Schedule } from '@/types/data';

/**
 * Reusable hook to manage SelectComponent fields synced with schedule context
 */
export function useScheduleSelectField<K extends keyof Partial<Schedule>>(
  field: K,
  options: OptionType[],
  defaultValue?: OptionType
) {
  const { schedule, setSchedule } = useScheduleContext();

  const initialValue = options.find(opt => opt.value === schedule?.[field]) ?? defaultValue ?? null;

  const [selected, setSelected] = useState<OptionType | null>(initialValue);

  // Sync local state with context schedule on mount or schedule changes
  useEffect(() => {
    if (schedule?.[field]) {
      const match = options.find(opt => opt.value === schedule[field]);
      if (match && (!selected || selected.value !== match.value)) {
        setSelected(match);
      }
    }
  }, [schedule?.[field], selected, options]);

  // Handle change from SelectComponent
  const handleChange = (newValue: OptionType | null) => {
    setSelected(newValue);
    if (newValue) {
      setSchedule(prev => ({
        ...prev,
        [field]: newValue.value,
      }));
    }
  };

  return {
    value: selected,
    onChange: handleChange,
  };
}
