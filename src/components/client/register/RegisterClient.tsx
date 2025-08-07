'use client';

import CardContainer from '@/components/ui/containers/CardContainer';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { login } from "@/lib/auth/auth-client" // Updated import
import { useApi } from '@/context/api-context';

interface LoginClientProps {
  redirectTo: string ;
}

const LoginClient: React.FC<LoginClientProps> = ({
  redirectTo = '/app'
}) => {
  const { api, client } = useApi();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  const [ name, setName ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  

  const handleRegister = async () => {
    // const res = await api(() => client.register())
  }
  

  return (
    <>
      <CardContainer containerBgClass='bg-day dark:bg-night bg-cover'>
        <h1 className="text-xl font-bold py-5 text-center">Registracija</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-2">
            <Input 
              id="username" 
              type="text" 
              name="Korisničko ime ili e-adresa"
              placeholder="marko.markovic"
              setVal={setUsername}
              inputVal={username}
            />
          </div>
          <div className="mb-2">
            <Input
              id="password"
              type="password"
              name="Lozinka"
              placeholder="•••••••"
              setVal={setPassword}
              inputVal={password}
            />
          </div>
          <div className='w-full flex justify-center my-3'>
            <button className="w-full btn-primary btn-green">Prijavi se!</button>
          </div>
          <p className="block text-sm">Nemaš nalog? <Link className="underline hover:no-underline cursor-pointer" href="/auth/register">Registruj se!</Link></p>
        </form>
      </CardContainer>
    </>
  )
}

export default LoginClient;