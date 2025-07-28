'use client';

import CardContainer from '@/components/ui/containers/CardContainer';
import Input from '@/components/ui/Input';
import MutationState from '@/components/ui/MutationState';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface LoginClientProps {
  redirectTo: string ;
}

const LoginClient: React.FC<LoginClientProps> = ({
  redirectTo = '/app'
}) => {
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState<boolean>(false);  
  const [ isSuccess, setIsSuccess ] = useState<boolean>(false);  

  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    
    const body = { username, password };

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/login`, {
        method: 'POST',
        credentials: 'include', // This is crucial to accept cookies from backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setIsSuccess(true);
      toast.success(data.message || 'Uspešno prijavljivanje!');
      router.replace(redirectTo);
    } catch (err: any) {
      toast.error(err.message || 'Došlo je do greške pri prijavi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
			<MutationState
				isLoading={isLoading}
				isSuccess={isSuccess}
        isError={false}
				successMessage="Uspešno prijavljivanje!"
			/>
      <CardContainer containerBgClass='bg-day dark:bg-night bg-cover'>
				<h1 className="text-xl font-bold py-5 text-center">Prijava</h1>
        <form onSubmit={handleLogin}>
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