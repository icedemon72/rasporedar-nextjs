import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '@/utils/session';
import { headers } from 'next/headers';

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const user = await getUserFromCookie();
  console.log(user);
  if (user) {
    const currentHeaders = await headers();
    const referer = currentHeaders.get('x-invoke-pathname') || currentHeaders.get('x-forwarded-path') || '';
    const currentPath = referer || '/app'; 

    redirect(currentPath);
  }

  return (
    <>
      {children}
    </>
  );
}
