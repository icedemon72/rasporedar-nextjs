import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '@/utils/session';
import { headers } from 'next/headers';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getUserFromCookie();

  if (!user) {
    const currentHeaders = await headers();
    const referer = currentHeaders.get('x-invoke-pathname') || currentHeaders.get('x-forwarded-path') || '';
    const currentPath = referer || '/app'; 

    const redirectUrl = `/auth/login?redirectTo=${encodeURIComponent(currentPath)}`;
    redirect(redirectUrl);
  }

  return (
    <>
      {children}
    </>
  );
}
