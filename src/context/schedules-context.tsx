'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { EMPTY_SCHEDULE_INSTANCE, GENERATE_ROW_WITH_ONE_ITEM, INITIAL_SCHEDULE } from '@/constants/schedule';
import { ExtendedSchedule, Institution, Schedule, SchedulePayload } from '@/types/data';
import { ModalType, ScheduleModalState } from '@/types/global';
import { useScheduleDraft } from '@/hooks/storage/use-schedule-draft';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import { useModal } from '@/hooks/use-modal';
import DeleteModal from '@/components/ui/modals/DeleteModal';
import ScheduleSubjectModal from '@/components/ui/modals/ScheduleSubjectModal';
import { fetchWithAuthClient } from '@/lib/auth/auth';
import { deepClone } from '@/utils/deep-clone';

interface ScheduleContextProps {
  step: number;
  schedule: ExtendedSchedule;
  // modal: ScheduleModalState;
  institution: Institution;
  setStep: (step: number) => void;
  setSchedule: React.Dispatch<React.SetStateAction<Partial<ExtendedSchedule>>>;
  handleChange: <K extends keyof Partial<ExtendedSchedule>>(field: K) => (value: Partial<ExtendedSchedule>[K]) => void;
  saveSchedule: () => Promise<void>;
  addSubject: (groupIndex: number, subject: any) => void;
  addTime: (groupIndex: number, subjectIndex: number, time: any) => void;
  deleteSubject: (groupIndex: number, subjectIndex: number) => void;
  handleAddRow: (groupIndex: number) => void;
  handleDeleteRow: (groupIndex: number) => void;

  handleAddItem: (payload: SchedulePayload, groupIndex: number, i: number, j: number) => void;
  // NEW: allow callers to clear the draft (e.g., after server save)
  clearDraft: () => void;
}

const SchedulesContext = createContext<ScheduleContextProps | null>(null);

export const SchedulesContextProvider = ({
  initialSchedule = null,
  institution,
  children
}: {
  initialSchedule?: Schedule | null;
  institution: Institution;
  children: React.ReactNode;
}) => {
  // 1) preselect an initial value (we’ll merge with draft below)
  const [schedule, setSchedule] = useState<Partial<ExtendedSchedule>>(
    (initialSchedule as Partial<ExtendedSchedule>) ?? INITIAL_SCHEDULE
  );

  const [step, setStep] = useState<number>(2);
  const modal = useModal();

  // 2) hook handles auto-saving; we can also read an existing draft
  const { getOne: getDraft, clearOne: clearDraftInternal } = useScheduleDraft(institution?._id, schedule);

  // 3) on mount or when institution changes, prefer a local draft (if any) over empty
  useEffect(() => {
    // don’t override a non-empty server schedule unless you want to prefer local drafts explicitly
    const hasServerData = Boolean(initialSchedule && (initialSchedule as any)?._id);
    const draft = getDraft?.();
    if (draft && !hasServerData) {
      setSchedule(prev => ({ ...prev, ...draft }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institution?._id]); // re-run when institution changes

  // core actions (pseudo)
  const saveSchedule = async () => {
    if (schedule._id) {
      // TODO: call update
    } else {
      // TODO: call create
    }
    // After a successful server save, you can clear the local draft:
    // clearDraftInternal();
  };

  const handleAddRow = (groupIndex: number) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      if (!copy.rows || !copy.days) return copy;
      copy.rows[groupIndex].data.forEach(dayData => dayData.push({ ...EMPTY_SCHEDULE_INSTANCE }));
      copy.rows[groupIndex].defaultTimes.push({ from: '', to: '' });
      return copy;
    });
  };

  const handleDeleteRow = (groupIndex: number) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      if (!copy.rows || !copy.days) return copy;
      const row = copy.rows[groupIndex];
      if (row.data[0].length <= 1) return copy;
      row.data.forEach(dayData => dayData.pop());
      row.defaultTimes.pop();
      return copy;
    });
  };

  const addSubject = (groupIndex: number, subject: any) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      // implement your subject placement here
      return copy;
    });
  };

  const addTime = (groupIndex: number, subjectIndex: number, time: any) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      // implement your time placement here
      return copy;
    });
  };

  const deleteSubject = (groupIndex: number, subjectIndex: number) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      // implement your deletion here
      return copy;
    });
  };

  const handleChange = useCallback(
    <K extends keyof Partial<ExtendedSchedule>>(field: K) =>
      (value: Partial<ExtendedSchedule>[K]) => {
        setSchedule(prev => ({ ...prev, [field]: value }));
      },
    []
  );

  // Ensure rows skeleton exists when groups/days change (as you had)
  useEffect(() => {
    if (!schedule?.groups || !schedule?.days) return;

    const currentRows = schedule.rows || [];
    const updatedRows = [...currentRows];
    let hasChange = false;

    schedule.groups.forEach((_, index) => {
      if (!updatedRows[index]) {
        updatedRows[index] = GENERATE_ROW_WITH_ONE_ITEM(schedule.days!.length);
        hasChange = true;
      } else {
        const row = updatedRows[index];
        if (!row.data[0] || row.data[0].length === 0) {
          for (let dayIndex = 0; dayIndex < schedule.days!.length; dayIndex++) {
            row.data[dayIndex].push({ ...EMPTY_SCHEDULE_INSTANCE });
          }
          row.defaultTimes.push({ from: '', to: '' });
          hasChange = true;
        }
      }
    });

    if (hasChange) {
      handleChange('rows')(updatedRows);
    }
  }, [schedule.groups, schedule.days, handleChange]);

  const clearDraft = useCallback(() => {
    clearDraftInternal();
  }, [clearDraftInternal]);

  const handleAddItem = async (
    payload: SchedulePayload,
    groupIndex: number,
    rowIndex: number,
    dayIndex: number,
  ) => {
    const { 
      subject,
      lecturer,
      location = null,
      time,
      checkLocation: isLocation,
      checkTime: isTime
    } = payload;
    
    let fromTo = (schedule.systemType !== 'school') 
			? { from: time!.startTime, to: time!.endTime }
			: { 
        from: schedule.rows![groupIndex].defaultTimes[rowIndex]?.from || '',
        to: schedule.rows![groupIndex].defaultTimes[rowIndex]?.to || ''
      }
      
      try {
        const res = await fetchWithAuthClient(
          `/institutions/${institution._id}/schedules/check`,
          {
            method: 'POST',
            body: JSON.stringify({
              location,
              frequency: schedule.frequency,
              validFrom: schedule.validFrom,
              time: { ...fromTo, day: dayIndex, lecturer: lecturer._id },
              isTime,
              isLocation
            })
          }
        );
        
        if (dayIndex < schedule.days!.length && dayIndex >= 0) {
          setSchedule(prev => {
            let { rows } = prev;
            rows = deepClone(rows);

            rows![groupIndex].data[dayIndex][rowIndex] = (schedule.systemType !== 'school') ?
            { ...rows![groupIndex].data[dayIndex][rowIndex], subject, lecturer, from: time!.startTime, to: time!.endTime, location: location! } 
              : { ...rows![groupIndex].data[dayIndex][rowIndex], subject, lecturer, location: location! };
            
            return {
              ...prev,
              rows
            };
          });     
        }
      } catch (err) {
        throw err;
      }
  }

  return (
    <SchedulesContext.Provider
      value={{
        step,
        schedule: schedule as ExtendedSchedule,
        institution,
        setStep,
        setSchedule,
        saveSchedule,
        addSubject,
        addTime,
        deleteSubject,
        handleChange,
        handleAddRow,
        handleDeleteRow,
        clearDraft,
        handleAddItem
      }}
    >
      {children}
      <ModalHost 
        close={modal.close}
        state={modal.state}
        registry={{
          'delete': DeleteModal,
          'cell': ScheduleSubjectModal
        }}
      />
    </SchedulesContext.Provider>
  );
};

export const useScheduleContext = () => {
  const ctx = useContext(SchedulesContext);
  if (!ctx) throw new Error('useScheduleContext must be used within a SchedulesContextProvider');
  return ctx;
};