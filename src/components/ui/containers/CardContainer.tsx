import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface CardContainerProps {
  children: ReactNode;
  large?: boolean;
  xlarge?: boolean;
  loaded?: boolean;
  containerBgClass?: string;
  cardBgClass?: string;
  onTop?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  large = false,
  xlarge = false,
  loaded = true,
  containerBgClass = '',
  cardBgClass = 'bg-white',
  onTop = false,
}) => {
  return (
    <div
      className={clsx(
        'w-full h-full min-h-[calc(100vh-76px)] flex justify-center p-0 md:p-2',
        onTop ? 'md:items-start' : 'md:items-center',
        containerBgClass
      )}
    >
      <div
        className={clsx(
          'w-full border bg-white py-4 px-8 rounded border-gray-400',
          cardBgClass,
          xlarge
            ? 'lg:w-4/5 xl:w-3/4'
            : !large
            ? 'md:w-3/4 lg:w-1/2 xl:w-1/3'
            : 'md:w-11/12 lg:w-3/4 xl:w-1/2',
          loaded && 'p-2'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default CardContainer;
