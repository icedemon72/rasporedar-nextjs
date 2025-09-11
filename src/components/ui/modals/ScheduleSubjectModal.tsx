// @ts-nocheck

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import SelectComponent from '../SelectComponent';
import { indexOfKeyInArray } from '@/utils/object-arrays';
import { PROFESSOR_TYPES } from '@/constants/professors';
import { ExtendedSchedule, Professor, Schedule, ScheduleInstanceData, SchedulePayload, Subject } from '@/types/data';
import { useAnimateModals } from '@/hooks/use-animate-modal';

/** Types you likely already have; adjust if needed */
type Id = string;

type Indexes = { i: number; j: number }; // i = rowIndex, j = dayIndex

interface ScheduleSubjectModalProps {
  subjects: Subject[];
  schedule: ExtendedSchedule;
  /** Current cell indices { i: rowIndex, j: dayIndex } */
  indexes: Indexes;
  data: ScheduleInstanceData;
  /** State coming from parent (availability toggles) */
  /** Actions */
  onClose: () => void;
  onSubmit: (payload: SchedulePayload) => void;

  /** Optional delete current cell (only shown if data?.subject exists) */
  onDelete?: () => void;

  /** Extra classes for container if needed */
  className?: string;
}

const ScheduleSubjectModal: React.FC<ScheduleSubjectModalProps> = ({
  subjects,
  schedule,
  indexes,
  data,
  onClose,
  onSubmit,
  onDelete,
  className,
}) => {
  const {
    isVisible,
    modalRef,
    backdropRef,
    handleClose,
    handleBackdrop,
    setIsVisible,
  } = useAnimateModals(onClose);

  const [ isTime, setIsTime ] = useState<boolean>(false);
  const [ isLocation, setIsLocation ] = useState<boolean>(false);

  const { days, systemType } = schedule;

  // Controlled fields
  const [selectedSubject, setSelectedSubject] = useState<{ value: Id; label: string } | null>(
    (data?.subject as Subject)?._id ? { value: (data.subject as Subject)._id, label: (data.subject as Subject).name } : null
  );

  const [selectedProfessorType, setSelectedProfessorType] = useState(PROFESSOR_TYPES[0]);
  const [selectedProfessor, setSelectedProfessor] = useState<{ value: Id; label: string } | null>(
    (data?.lecturer as Professor)?._id ? { value: (data.lecturer as Professor)._id, label: (data.lecturer as Professor).name } : null
  );

  const [startTime, setStartTime] = useState<string>(data?.from || '');
  const [endTime, setEndTime] = useState<string>(data?.to || '');
  const [location, setLocation] = useState<string>(data?.location || '');

  // Animate in
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ESC handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!(data?.lecturer as Professor)?._id || !selectedSubject?.value) return;

    const subjIdx = indexOfKeyInArray(subjects, '_id', selectedSubject.value);
    if (subjIdx === -1) return;

    const subj = subjects[subjIdx];
    const inProfessors = subj.professors.some((p) => p._id === (data.lecturer as Professor)!._id);
    const inAssistants = subj.assistents.some((a) => a._id === (data.lecturer as Professor)!._id);

    if (inProfessors) {
      // ensure we are on "professor"
      if (selectedProfessorType?.value !== 'professor') {
        setSelectedProfessorType(PROFESSOR_TYPES.find((t) => t.value === 'professor') || PROFESSOR_TYPES[0]);
      }
    } else if (inAssistants) {
      // ensure we are on "assistant"
      if (selectedProfessorType?.value !== 'assistant') {
        setSelectedProfessorType(PROFESSOR_TYPES.find((t) => t.value === 'assistant') || PROFESSOR_TYPES[1]);
      }
    }
  }, [(data?.lecturer as Professor)?._id, selectedSubject?.value, subjects, selectedProfessorType?.value]);

  const subjectOptions = useMemo(
    () => subjects.map((s) => ({ value: s._id, label: s.name })),
    [subjects]
  );

  const selectedSubjectEntity: Subject | null = useMemo(() => {
    if (!selectedSubject?.value) return null;
    const idx = indexOfKeyInArray(subjects, '_id', selectedSubject.value);
    return idx === -1 ? null : subjects[idx];
  }, [selectedSubject?.value, subjects]);

  const professorOptions = useMemo(() => {
    if (!selectedSubjectEntity) return [];
    const pool =
      selectedProfessorType?.value === 'professor'
        ? selectedSubjectEntity.professors
        : selectedSubjectEntity.assistents;
    return pool.map((p) => ({ value: p._id, label: `${p.title || ''} ${p.name}`.trim() }));
  }, [selectedProfessorType?.value, selectedSubjectEntity]);

  const canSubmit =
    Boolean(selectedSubjectEntity) &&
    Boolean(selectedProfessor?.value) &&
    (systemType === 'school' || (startTime && endTime && startTime < endTime));

  const handleConfirm = () => {
    if (!selectedSubjectEntity || !selectedProfessor?.value) return;

    const resolveLecturer = () => {
      const pool =
        selectedProfessorType?.value === 'professor'
          ? selectedSubjectEntity.professors
          : selectedSubjectEntity.assistents;
      const idx = indexOfKeyInArray(pool, '_id', selectedProfessor.value);
      return idx === -1 ? null : pool[idx];
    };

    const lecturer = resolveLecturer();
    if (!lecturer) return;

    const timePayload =
      systemType !== 'school' ? { startTime, endTime } : null;

    onSubmit({
      subject: selectedSubjectEntity,
      lecturer,
      time: timePayload,
      location,
      checkTime: isTime,
      checkLocation: isLocation
    });

    handleClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={clsx(
        'fixed inset-0 z-[1054] flex items-center justify-center bg-black/50 backdrop-blur-sm',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      onMouseDown={handleBackdrop}
      ref={backdropRef}
    >
      <div
        ref={modalRef}
        className={clsx(
          'z-[1056] w-full max-w-[95%] md:max-w-2xl rounded-lg border border-gray-200 bg-white shadow-lg',
          'transition-all duration-300 p-6 md:p-8',
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2',
          className
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg md:text-xl font-semibold">
            {days![indexes.j]}, {indexes.i + 1}. {systemType !== 'school' ? 'predavanje' : 'čas'}
          </h2>

          {data?.subject && onDelete && (
            <button
              aria-label="Obriši predavanje/čas"
              className="btn-primary btn-red flex items-center gap-2 px-3 py-2 text-sm"
              onClick={() => {
                onDelete();
                handleClose();
              }}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Obriši predavanje"
            >
              <Trash className="h-4 w-4" />
              <span className="hidden md:inline">Obriši</span>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="space-y-4">
          {/* Subject */}
          <div>
            <label className="label-primary mb-1 block text-start">Predmet</label>
            <SelectComponent
              data={subjectOptions}
              isMulti={false}
              value={selectedSubject}
              setVal={(opt: any) => {
                setSelectedSubject(opt);
                // reset professor selection on subject change
                setSelectedProfessor(null);
              }}
              required
              isClearable={false}
              placeholder="Izaberite predmet"
            />
          </div>

          {/* If subject chosen, show professor type + professor */}
          {selectedSubjectEntity && (
            <>
              {systemType !== 'school' && (
                <div>
                  <label className="label-primary mb-1 block text-start">Tip profesora</label>
                  <SelectComponent
                    data={PROFESSOR_TYPES}
                    isMulti={false}
                    value={selectedProfessorType}
                    required
                    setVal={(e: any) => {
                      setSelectedProfessorType(e);
                      setSelectedProfessor(null);
                    }}
                    placeholder="Izaberite tip profesora"
                    isClearable={false}
                  />
                </div>
              )}

              <div>
                <label className="label-primary mb-1 block text-start">Predavač</label>
                <SelectComponent
                  data={professorOptions}
                  setVal={(e: any) => setSelectedProfessor(e)}
                  value={selectedProfessor}
                  required
                  isClearable={false}
                  placeholder={
                    systemType !== 'school'
                      ? 'Izaberite profesora/asistenta'
                      : 'Izaberite nastavnika/predavača'
                  }
                />
              </div>

              {/* Time (non-school) */}
              {systemType !== 'school' && (
                <div>
                  <label className="label-primary block text-start">Termin</label>
                  <div className="mt-3 flex w-full items-center gap-3">
                    <div className="basis-1/2">
                      <label htmlFor="from" className="label-primary text-xs uppercase">Od</label>
                      <input
                        id="from"
                        type="time"
                        className="input-primary"
                        step={3600}
                        min="00:00"
                        max="23:59"
                        pattern="[0-2][0-9]:[0-5][0-9]"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <div className="basis-1/2">
                      <label htmlFor="to" className="label-primary text-xs uppercase">Do</label>
                      <input
                        id="to"
                        type="time"
                        className="input-primary"
                        step={3600}
                        min="00:00"
                        max="23:59"
                        pattern="[0-2][0-9]:[0-5][0-9]"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <span className="mt-2 block text-xs text-slate-500">*AM = prepodne, PM = poslepodne</span>
                  <span className="block text-xs text-slate-500">(08:00PM = 20:00)</span>
                </div>
              )}

              {/* Location */}
              <div>
                <label htmlFor="location" className="label-primary mb-1 block text-start">Kabinet/sala/učionica</label>
                <input
                  id="location"
                  className="input-primary mb-1 w-full"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Kabinet 1, RC 2, Sala 3..."
                />
              </div>

              {/* Checks */}
              <div>
                <p className="label-primary mb-2 text-start">Provere</p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <label
                    className="col-span-1 flex cursor-pointer select-none items-center justify-center gap-2"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Da li izabrani predavač već ima predavanje u ovom terminu"
                  >
                    <input
                      type="checkbox"
                      checked={isTime}
                      onChange={() => setIsTime((prev) => !prev)}
                    />
                    <span className="label-primary text-xs w-auto">Dostupnost profesora</span>
                  </label>

                  <label
                    className="col-span-1 flex cursor-pointer select-none items-center justify-center gap-2"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Da li postoji predavanje/čas u datom terminu u nekoj prostoriji/sali/učionici"
                  >
                    <input
                      type="checkbox"
                      checked={isLocation}
                      onChange={() => setIsLocation((prev) => !prev)}
                    />
                    <span className="label-primary text-xs w-auto">Dostupnost prostorije</span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleClose}
            className={clsx(
              'rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700',
              'hover:bg-gray-100 transition'
            )}
          >
            Otkaži
          </button>

          <button
            disabled={!canSubmit}
            onClick={handleConfirm}
            className={clsx(
              'rounded-md btn-primary px-4 py-2 text-sm font-medium text-white',
              'transition',
              !canSubmit && 'opacity-50 cursor-not-allowed'
            )}
          >
            {data?.subject ? 'Sačuvaj izmene' : 'Dodaj'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSubjectModal;