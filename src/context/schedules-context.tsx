'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { EMPTY_SCHEDULE_INSTANCE, GENERATE_ROW_WITH_ONE_ITEM, INITIAL_SCHEDULE } from "@/constants/schedule";
import { ExtendedSchedule, Institution, Schedule } from "@/types/data";
import { ModalType, ScheduleModalState } from "@/types/global";

interface ScheduleContextProps {
  step: number;
  schedule: ExtendedSchedule;
  modal: ScheduleModalState;
  institution: Institution;
  setStep: (step: number) => void;
  setSchedule: React.Dispatch<React.SetStateAction<Partial<ExtendedSchedule>>>;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  
  handleChange: <K extends keyof Partial<ExtendedSchedule>>(field: K) => (value: Partial<ExtendedSchedule>[K]) => void;
  saveSchedule: () => Promise<void>;
  addSubject: (groupIndex: number, subject: any) => void;
  addTime: (groupIndex: number, subjectIndex: number, time: any) => void;
  deleteSubject: (groupIndex: number, subjectIndex: number) => void;
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
  const [ step, setStep ] = useState<number>(2);
  const [ schedule, setSchedule ] = useState<Partial<ExtendedSchedule>>(initialSchedule ?? INITIAL_SCHEDULE);
  const [ modal, setModal ] = useState<ScheduleModalState>({ type: null });

  const openModal = (type: ModalType, data?: any) => setModal({ type, data });
  const closeModal = () => setModal({ type: null });

  // core actions (pseudo)
  const saveSchedule = async () => {
    if (schedule._id) {
      // TODO: call update
    } else {
      // TODO: call create
    }
  };

  const addSubject = (groupIndex: number, subject: any) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      // copy.rows[groupIndex].data.push(subject);
      return copy;
    });
  };

  const addTime = (groupIndex: number, subjectIndex: number, time: any) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      // copy.rows[groupIndex].data[subjectIndex].times.push(time);
      return copy;
    });
  };

  const deleteSubject = (groupIndex: number, subjectIndex: number) => {
    setSchedule(prev => {
      const copy = structuredClone(prev);
      // copy.rows[groupIndex].data.splice(subjectIndex, 1);
      return copy;
    });
  };

  const handleChange = useCallback(
    <K extends keyof Partial<ExtendedSchedule>>(field: K) => (value: Partial<ExtendedSchedule>[K]) => {
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
          // Add a new column (item) to each day
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
  }, [schedule.groups, schedule.days]);

  return <SchedulesContext.Provider value={{
    step,
    schedule,
    modal,
    institution,
    setStep,
    setSchedule,
    openModal,
    closeModal,
    saveSchedule,
    addSubject,
    addTime,
    deleteSubject,
    handleChange
  }}>
    { children }
  </SchedulesContext.Provider>
}

export const useScheduleContext = () => {
  const context = useContext(SchedulesContext);

  if (!context) {
    throw new Error("useScheduleContext must be used within a SchedulesContextsProvider");
  }
  
  return context;
}