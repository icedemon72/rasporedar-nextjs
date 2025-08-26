'use client';

import React from 'react';
import { useScheduleContext } from '@/context/schedules-context';
import Schedule from '../Schedule';

const ScheduleStepTwo = () => {
  const { schedule } = useScheduleContext();
  
  return (
    <div className="py-2">
      <Schedule 
        editable={true}
        schedule={schedule}
      />
    </div>
  );
}

export default ScheduleStepTwo;