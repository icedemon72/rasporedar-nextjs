'use client';

import { useScheduleContext } from '@/context/schedules-context';
import React from 'react';
import ScheduleStepOne from '../steps/ScheduleStepOne';
import ScheduleStepTwo from '../steps/ScheduleStepTwo';
import Stepper from '../steps/Stepper';
import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';

const ScheduleCreateForm = () => {
  const { step, setStep } = useScheduleContext();

  return (
    <div>
      <Stepper />
      { step === 1 && <ScheduleStepOne /> }
      { step === 2 && <ScheduleStepTwo /> }
      <div 
        className={clsx(
          'flex', step === 1 ? 'justify-end' : 'justify-between'
        )}
      >
        {
          step === 1 && (
            <button 
              className="btn-primary px-4"
              onClick={() => setStep(2)}
            >
              Sledeći korak
            </button>
          )
        }
        {
          step === 2 && (
            <>
              <button 
                className="btn-outline px-4"
                onClick={() => setStep(1)}
              >
                Prethodni korak
              </button>
              <button 
                className="btn-primary px-4"
                onClick={() => alert('SAVED!')}
              >
                Sačuvaj raspored
              </button>
            </>
          )
        }
      </div>
    </div>
  );
}

export default ScheduleCreateForm;