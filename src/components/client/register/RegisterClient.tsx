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

const RegisterClient = () => {
  const { api, client } = useApi();
  const router = useRouter();

  const [ name, setName ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const body = {
      name, email, username, password
    }
    const res = await api(
      () => client.register(body),
      {
        onSuccess(data) {
          router.push('/auth/login');
        },
        onError(error) {
          console.error(error);
        }
      }
    );
  }
  

  return (
    <>
      <CardContainer containerBgClass='bg-day dark:bg-night bg-cover'>
        <h1 className="text-xl font-bold py-5 text-center">Registracija</h1>
        <form onSubmit={handleRegister} className="space-y-2">
          <div>
            <Input 
              id="username" 
              type="text" 
              name="Korisničko ime"
              placeholder="marko.markovic"
              setVal={setUsername}
              inputVal={username}
            />
             <span className="text-xs text-muted">* Korisničko ime ne sme sadržati razmak</span>
          </div>
          <Input 
            id="emaik" 
            type="email" 
            name="E-adresa"
            placeholder="marko.markovic@primer.com"
            setVal={setEmail}
            inputVal={email}
          />
          <div>
            <Input
              id="password"
              type="password"
              name="Lozinka"
              placeholder="•••••••"
              setVal={setPassword}
              inputVal={password}
            />
            <span className="text-xs text-muted">* Lozinka mora sadržati bar 3 karaktera</span>
          </div>
          <Input
            id="name"
            type="text"
            name="Ime i prezime"
            placeholder="Marko Marković"
            setVal={setName}
            inputVal={name}
          />
          <div className='w-full flex justify-center my-3'>
            <button className="w-full btn-primary btn-green">Registruj se!</button>
          </div>
          <p className="block text-sm">Imaš nalog? <Link className="underline hover:no-underline cursor-pointer" href="/auth/login">Prijavi se!</Link></p>
        </form>
      </CardContainer>
    </>
  )
}

export default RegisterClient;