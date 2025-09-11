'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { ExtendedSchedule, ScheduleInstanceData } from '@/types/data';
import { useAnimateModals } from '@/hooks/use-animate-modal';

type Indexes = { i: number; j: number }; // i = rowIndex, j = dayIndex

interface ScheduleTimeModalProps {
  className?: string;
  indexes: Indexes;
  data: ScheduleInstanceData;
  schedule: ExtendedSchedule;
  onClose: () => void;
  onSubmit: (payload: { startTime: string; endTime: string }) => void;
  onDelete?: () => void;
}

const ScheduleTimeModal: React.FC<ScheduleTimeModalProps> = ({
  className,
  indexes,
  data,
  onClose,
  onSubmit,
}) => {
  const {
    isVisible,
    modalRef,
    backdropRef,
    handleClose,
    handleBackdrop,
  } = useAnimateModals(onClose);
  const [startTime, setStartTime] = useState<string>(data?.from || '');
  const [endTime, setEndTime] = useState<string>(data?.to || '');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    if (!startTime || !endTime) {
      setError('Morate izabrati oba termina.');
      return;
    }

    if (startTime >= endTime) {
      setError('Vreme početka mora biti pre vremena završetka.');
      return;
    }

    setError(null);
    onSubmit({ startTime, endTime });
    handleClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={clsx(
        'fixed inset-0 z-[1054] flex items-center justify-center bg-black/70 backdrop-blur-sm',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      ref={backdropRef}
      onMouseDown={handleBackdrop}
    >
      <div
        ref={modalRef}
        className={clsx(
          'z-[1056] w-full max-w-[95%] md:max-w-md rounded-lg border border-gray-200 bg-white shadow-lg',
          'transition-all duration-300 p-6 md:p-8 flex flex-col justify-between',
          isVisible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2'
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h1 className="text-lg md:text-xl font-semibold mb-4">
          {indexes.i + 1}. čas – podešavanje termina
        </h1>

        <div className="space-y-4">
          <div>
            <label className="label-primary mb-2 block">Termin</label>
            <div className="flex items-center w-full gap-3">
              <div className="flex flex-col basis-1/2">
                <label className="label-primary text-xs uppercase">Od</label>
                <input
                  type="time"
                  className="input-primary"
                  step={3600}
                  min="00:00"
                  max="23:59"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="flex flex-col basis-1/2">
                <label className="label-primary text-xs uppercase">Do</label>
                <input
                  type="time"
                  className="input-primary"
                  step={3600}
                  min="00:00"
                  max="23:59"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <span className="text-xs block text-slate-500 mt-2">
              *AM = prepodne, PM = poslepodne
            </span>
            <span className="text-xs block text-slate-500">
              (08:00PM = 20:00)
            </span>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Footer */}
        <div className="mt-6 flex w-full gap-3">
          <button
            onClick={handleClose}
            className="btn-primary btn-red w-full text-center"
          >
            Otkaži
          </button>
          <button
            onClick={handleAdd}
            className="btn-primary btn-green w-full text-center"
          >
            {data?.from && data?.to ? 'Sačuvaj izmene' : 'Dodaj termin'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTimeModal;