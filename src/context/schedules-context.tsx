'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { EMPTY_SCHEDULE_INSTANCE, GENERATE_ROW_WITH_ONE_ITEM, INITIAL_SCHEDULE } from '@/constants/schedule';
import { ExtendedSchedule, Institution, Schedule, SchedulePayload, ScheduleTime } from '@/types/data';
import { useScheduleDraft } from '@/hooks/storage/use-schedule-draft';
import { ModalHost } from '@/components/ui/modals/ModalHost';
import { useModal } from '@/hooks/use-modal';
import DeleteModal from '@/components/ui/modals/DeleteModal';
import ScheduleSubjectModal from '@/components/ui/modals/ScheduleSubjectModal';
import { fetchWithAuthClient } from '@/lib/auth/auth';
import { deepClone } from '@/utils/deep-clone';
import { useApi } from './api-context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ScheduleContextProps {
  step: number;
  schedule: ExtendedSchedule;
  institution: Institution;
  setStep: (step: number) => void;
  setSchedule: React.Dispatch<React.SetStateAction<Partial<ExtendedSchedule>>>;
  handleChange: <K extends keyof Partial<ExtendedSchedule>>(field: K) => (value: Partial<ExtendedSchedule>[K]) => void;
  saveSchedule: () => Promise<void>;
  addSubject: (groupIndex: number, subject: any) => void;
  addTime: (groupIndex: number, subjectIndex: number, time: any) => void;
  deleteSubject: (groupIndex: number, subjectIndex: number) => void;
  handleAddRow: (groupIndex: number) => void;
  handleDeleteRow: (groupIndex: number, index?: number) => void;
  handleDeleteGroup: (groupIndex: number) => void;
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
  const router = useRouter();
  const { api, client } = useApi();
  const [schedule, setSchedule] = useState<Partial<ExtendedSchedule>>(
    (initialSchedule as Partial<ExtendedSchedule>) ?? INITIAL_SCHEDULE
  );

  const [step, setStep] = useState<number>(1);
  const modal = useModal();

  const { getOne: getDraft, clearOne: clearDraftInternal } = useScheduleDraft(institution?._id, schedule);

  useEffect(() => {
    const hasServerData = Boolean(initialSchedule && (initialSchedule as any)?._id);
    const draft = getDraft?.();
    if (draft && !hasServerData) {
      setSchedule(prev => ({ ...prev, ...draft }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institution?._id]);

  const saveSchedule = async (published = false) => {
    try {
      if (!schedule) return;

      const tempRows = deepClone(schedule.rows ?? []);

      for (let i = 0; i < tempRows.length; i++) {
        for (let j = 0; j < (schedule.days?.length ?? 0); j++) {
          for (let k = 0; k < tempRows[i].data[j].length; k++) {
            let item = tempRows[i].data[j][k];

            if (item.subject) {
              tempRows[i].data[j][k] = {
                ...item,
                subject: typeof item.subject === 'object' ? item.subject._id : item.subject
              };

              if (item.lecturer) {
                tempRows[i].data[j][k] = {
                  ...tempRows[i].data[j][k],
                  lecturer: typeof item.lecturer === 'object' ? item.lecturer._id : item.lecturer
                };
              }
            }
          }
        }
      }

      const body: Partial<Schedule> & { rows: any[] } = {
        title: schedule.title ?? '',
        days: schedule.days ?? [],
        style: schedule.style ?? '',
        validUntil: schedule.validUntil ?? '',
        validFrom: schedule.validFrom ?? '',
        frequency: schedule.frequency ?? '',
        systemType: schedule.systemType ?? '',
        subtitle: schedule.subtitle ?? '',
        comment: schedule.comment ?? '',
        department: schedule.department ?? '',
        groups: schedule.groups ?? [],
        published: true,
        rows: tempRows
      };

      if (schedule._id) {
        // update existing
        // await api(
        //   () => client.updateSchedule(institution._id, schedule._id!, body),
        //   {
        //     onSuccess(result) {
        //       clearDraftInternal();
        //       console.log('Updated schedule', result);
        //     },
        //     onError(err) {
        //       console.error('Update failed', err);
        //     }
        //   }
        // );
      } else {
        // create new
        await api(
          () => client.saveSchedule(institution._id, body),
          {
            onSuccess(result) {
              clearDraftInternal();
              toast.success('Raspored uspešno kreiran.');
              router.push(`/app/institutions/${institution._id}/schedules/${result._id}`);
            },
            onError(err) {
              console.error('Create failed', err);
            }
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleAddRow = (groupIndex: number) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      if (!copy.rows || !copy.days) return copy;
      copy.rows[groupIndex].data.forEach(dayData => dayData.push({ ...EMPTY_SCHEDULE_INSTANCE }));
      copy.rows[groupIndex].defaultTimes.push({ from: '', to: '' });
      return copy;
    });
  };

  const handleDeleteRow = (groupIndex: number, index: number = -1) => {
    setSchedule(prev => {
      const copy = deepClone(prev);
      if (!copy.rows) return copy;

      const data = copy.rows![groupIndex].data;
      const days = copy.days;

      if (
        !data.length ||
        index >= data[0].length ||
        data[0].length === 1 ||
        !days
      ) return copy;

      if (index === -1) {
        days.forEach((_, i: number) => {
          data[i].pop();
        });
        copy.rows![groupIndex].defaultTimes.pop();
      }
      else {
        days.forEach((_, i: number) => {
					data[i].splice(index, 1);
				});
        copy.rows![groupIndex].defaultTimes.splice(index, 1);
      }
        
      return {
        ...copy
      };
    });
  }

  const addSubject = (groupIndex: number, subject: any) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      // implement your subject placement here
      return copy;
    });
  };

  const addTime = (groupIndex: number, rowIndex: number, time: ScheduleTime) => {
    setSchedule((prev) => {
      if (!prev?.rows) return prev;

      const copy = structuredClone(prev);

      if (!copy.rows) return copy;

      const row = copy.rows[groupIndex];

      // resize defaultTimes if needed
      while (row.defaultTimes.length <= rowIndex) {
        row.defaultTimes.push({ from: '', to: '' });
      }

      row.defaultTimes[rowIndex] = {
        from: time.startTime,
        to: time.endTime
      };

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

  const handleDeleteGroup = (groupIndex: number) => {
    if (groupIndex < schedule?.groups?.length!) {
      setSchedule(prev => {
        if (!prev.rows || !prev.groups) return prev;

        prev.rows.splice(groupIndex, 1);
        prev.groups.splice(groupIndex, 1);

        return prev;
      });
    }
  }

  const handleChange = useCallback(
    <K extends keyof Partial<ExtendedSchedule>>(field: K) =>
      (value: Partial<ExtendedSchedule>[K]) => {
        setSchedule(prev => ({ ...prev, [field]: value }));
      },
    []
  );

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
    setSchedule({});
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
        handleAddItem,
        handleDeleteGroup
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