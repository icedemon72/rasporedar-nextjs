import { useScheduleContext } from '@/context/schedules-context';
import React from 'react';

const Stepper = () => {
  const { step, setStep } = useScheduleContext();

  return (
    <div className="flex justify-center items-center space-x-4">
      <div
        onClick={() => setStep(1)}
        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-2 transition-colors ${
          step === 1 ? 'bg-black border-black text-white' : 'border-gray-500 text-gray-500'
        }`}
      >
        1
      </div>

      <div className="h-0.5 w-12 bg-gray-300" />

      <div
        onClick={() => setStep(2)}
        className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-2 transition-colors ${
          step === 2 ? 'bg-black border-black text-white' : 'border-gray-500 text-gray-500'
        }`}
      >
        2
      </div>
    </div>
  );
};

export default Stepper;