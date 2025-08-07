import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getCurrentUserServer } from '@/lib/auth/auth-server';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUserServer();
  
  if (!user) {
    const currentHeaders = await headers();
    const referer = currentHeaders.get('x-current-path') || '';
    const currentPath = referer || '/app';
   
    redirect(`/auth/login?redirectTo=${encodeURIComponent(currentPath)}`);
  }

  return <>{children}</>;
}
