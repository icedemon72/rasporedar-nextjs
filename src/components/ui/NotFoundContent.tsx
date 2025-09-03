import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface NotFoundContentProps {
  children?: React.ReactNode;
}

const defaultChildren = (
  <React.Fragment>
    <h2>Ups, izgleda da tražena stranica ne postoji...</h2>
    <Link href="/">Vrati se na početnu?</Link>
  </React.Fragment>
)

const NotFoundContent: React.FC<NotFoundContentProps> = ({ 
  children = defaultChildren
}) => {
  return (
    <div className="min-h-screen size-full flex flex-col items-center justify-center">
       <div className="w-full max-w-md">
        <Image
          src="/assets/icons/not-found.svg"
          alt="404 Not Found"
          width={500}
          height={500}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="text-center">
        { children }
      </div>
    </div>
  );
}

export default NotFoundContent;