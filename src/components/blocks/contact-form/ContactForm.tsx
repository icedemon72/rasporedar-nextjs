'use client';

import Input from '@/components/ui/Input';
import SelectComponent from '@/components/ui/SelectComponent';
import Textarea from '@/components/ui/Textarea';
import { OptionType } from '@/types/global';
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface ContactFormProps {
  tags: Array<{
    text: string;
  }>;
}

type ContactForm = {
  name: string,
  email: string,
  phone: string,
  reason: string,
  message: string,
}

const ContactForm: React.FC<ContactFormProps> = ({
  tags
}) => {
  const [ selectedOption, setSelectedOption ] = useState<OptionType | null>(null);
  const [ form, setForm ] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });

  const handleChange = (val: string, name: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSelectChange = (option: OptionType | null) => {
    setSelectedOption(option);
    handleChange(option?.value || '', 'reason');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error submitting contact form:", data.error);
        toast.error('Greška prilikom slanja poruke, pokušajte ponovo.')
        return;
      }

      toast.success("Uspešno ste poslali poruku. Hvala vam!");
      // Optionally reset form
      setForm({
        name: '',
        email: '',
        phone: '',
        reason: '',
        message: '',
      });
      setSelectedOption(null);
    } catch (err) {
      console.error(err);
      alert("Došlo je do greške.");
    }
  };

  const tagOptions: OptionType[] = tags.map(({ text }) => ({
    label: text,
    value: text,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded-lg p-4">
      <div>
        <Input 
          id='name'
          name='Ime*'
          placeholder='Nikola Nikolić'
          type='text'
          required
          inputVal={form.name}
          setVal={(val) => handleChange(val, 'name')}
        />
      </div>

      <div>
        <Input 
          id='email'
          name='E-adresa*'
          placeholder='nikolanikolic@primer.com'
          type='email'
          required
          inputVal={form.email}
          setVal={(val) => handleChange(val, 'email')}
        />
      </div>

      <div>
        <Input 
          id='phone'
          name='Broj telefona (opciono)'
          placeholder='+381612345678'
          type='phone'
          required
          inputVal={form.phone}
          setVal={(val) => handleChange(val, 'phone')}
        />
      </div>

      <div>
        <label className="label-primary">Razlog za kontakt</label>
        <SelectComponent
          data={tagOptions}
          placeholder="Izaberite razlog kontaktiranja"
          isClearable={false}
          isSearchable={false}
          isMulti={false}
          value={selectedOption}
          setVal={(val) => handleSelectChange(val as OptionType)}
        />
      </div>

      <div>
        <Textarea 
          inputVal={form.message}
          setVal={(e) => handleChange(e, 'message')}
          name='Poruka'
        />
      </div>

      <button type="submit" className="btn-primary px-4 my-4 items-center">
        Pošalji poruku
        <ArrowRight size={14} />
      </button>
    </form>
  );
}

export default ContactForm;