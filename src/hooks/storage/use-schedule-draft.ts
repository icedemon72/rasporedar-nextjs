'use client';

import { useDraftStorage } from './use-draft-storage';
import { ExtendedSchedule } from '@/types/data';

/** bump when structure changes to isolate old drafts */
const DRAFTS_KEY = 'scheduleDrafts/v1';

export function useScheduleDraft(
  institutionId: string | undefined,
  schedule: Partial<ExtendedSchedule> | undefined
) {
  // Optional: strip transient fields before persisting
  const serialize = (v: Partial<ExtendedSchedule>) => {
    const copy: any = { ...v };
    // example: don’t persist _id when creating new; adjust to your needs
    // if (!copy._id) delete copy._id;
    return copy;
  };

  return useDraftStorage<Partial<ExtendedSchedule>>(
    DRAFTS_KEY,
    institutionId ?? null,   // eksplicitno null kad nema ID
    schedule,
    { debounce: 300, serialize }
  );
}
