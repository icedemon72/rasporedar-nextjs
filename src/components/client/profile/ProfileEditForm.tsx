'use client';

import React, { useState } from 'react';
import { UpdateUserBody, User } from '@/types/fetch';
import Input from '@/components/ui/Input';
import { useApi } from '@/context/api-context';
import { Save } from 'lucide-react';
import { toast } from 'react-toastify';

interface ProfileEditFormProps {
  user: User
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  user
}) => {
  const { client, api } = useApi();
  const [ name, setName ] = useState<string>(user.name as string || '');
  const [ email, setEmail ] = useState<string>(user.email);
  const [ username, setUsername ] = useState<string>(user.username);

  const [ oldPassword, setOldPassword ] = useState<string>('');
	const [ newPassword, setNewPassword ] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let body: UpdateUserBody = {
      username, email, name
    }

    if (oldPassword || newPassword) {
      body.oldPassword = oldPassword;
      body.newPassword = newPassword;
    }

    await api(
      () => client.updateUser(body), 
      {
        onSuccess() {
          toast.success('Profil uspešno izmenjen.');
        },
        onError(error) {
          toast.error('Došlo je do greške prilikom izmene profila.');
        }
      }
    )

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        type="text"
        name="Ime korisnika"
        inputVal={name}
        placeholder="Marko Marković"
        setVal={(val) => setName(val)}
      />

      <Input
        id="email"
        type="text"
        name="E-adresa"
        inputVal={email}
        placeholder="marko.markovic@primer.com"
        setVal={(val) => setEmail(val)}
      />

      <Input
        id="username"
        type="text"
        name="Korisničko ime"
        inputVal={username}
        placeholder="marko.markovi"
        setVal={(val) => setUsername(val)}
      />

      <Input
        id="oldPassword"
        type="password"
        name="Stara lozinka"
        inputVal={oldPassword}
        placeholder="•••••••"
        setVal={(val) => setOldPassword(val)}
      />

      <Input
          id="newPassword"
          type="password"
          name="Nova lozinka"
          inputVal={newPassword}
          placeholder="•••••••"
          setVal={(val) => setNewPassword(val)}
      />

      <div className="flex justify-start">
        <button 
          type="submit" 
          className="w-full lg:w-auto btn-primary px-4 my-4"
        >
          <Save />
          Sačuvaj izmene
        </button>
      </div>
    </form>
  )
}

export default ProfileEditForm;