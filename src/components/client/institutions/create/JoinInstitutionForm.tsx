'use client';

import React, { useState } from 'react';
import CardContainer from '@/components/ui/containers/CardContainer';
import { useRouter, useSearchParams } from 'next/navigation';
import CodeInput from '@/components/ui/institutions/CodeInput';
import { useApi } from '@/context/api-context';
import Link from 'next/link';
import { toast } from 'react-toastify';

const JoinInstitutionForm = () => {
  const router = useRouter();
  const { isLoading, api, client } = useApi();
  const searchParams = useSearchParams();
  const paramCode = searchParams.get('code');
  const paramRole = searchParams.get('role');

  const [ code, setCode ] = useState<string>(paramCode || '');
  const [ role, setRole ] = useState<'user' | 'moderator'>((paramRole === 'moderator') ? 'moderator' : 'user');

  const handleJoin = async () => {
    await api(() => client.joinInstitution(code, role),
    {
      onError(error) {
        toast.error('Uneli ste pogrešan kod.')
      },
      onSuccess(data) {
        toast.success('Uspešno ste se pridružili grupi!');
        router.push(`/app/institutions/${data._id}`);
      }
    }
  );
  }

  return (
     <CardContainer containerBgClass='bg-day dark:bg-night bg-cover'>
      <h1 className="text-xl font-bold py-5 text-center">Pridruži se grupi kao { role === 'moderator' ? 'moderator' : 'korisnik'}</h1>
      <div className="space-y-2">
        <CodeInput
          insertCode={paramCode || ''}
          codeFunc={(code) => setCode(code)}
        />
        <div className="flex justify-end w-full mt-3 gap-2">
          <button className="w-full md:w-1/2 lg:w-1/3 btn-primary bg-white text-black" onClick={() => setRole(role === 'user' ? 'moderator' : 'user')}>
            Kao { role === 'user' ? 'moderator?' : 'korisnik?'}
          </button>
          <button className="w-full md:w-1/2 lg:w-1/3 btn-primary" disabled={isLoading} onClick={handleJoin}>Pridruži se grupi!</button>
        </div>
        <div>
          <p className="text-sm text-center my-4">Želiš svoju grupu? <Link className="underline hover:no-underline" href="/app/institutions/create">Napravi je!</Link></p>
        </div>
      </div>
    </CardContainer>
  );
}

export default JoinInstitutionForm;