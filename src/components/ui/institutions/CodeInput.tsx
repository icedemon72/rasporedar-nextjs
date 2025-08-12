'use client';

import { useRef, useState, useEffect } from 'react';
import { X, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface CodeInputProps {
  reset?: boolean;
  codeFunc: (code: string) => void;
  className?: string;
  insertCode?: string;
}

const CODE_LENGTH = 8;

const CodeInput: React.FC<CodeInputProps> = ({
  reset,
  codeFunc,
  className = '',
  insertCode = '',
}) => {
  const [code, setCode] = useState('');
  const inputRefs = Array.from({ length: CODE_LENGTH }, () => useRef<HTMLInputElement>(null));

  const resetCode = () => {
    inputRefs.forEach(ref => {
      if (ref.current) ref.current.value = '';
    });
    inputRefs[0]?.current?.focus();
    setCode('');
  };

  // Reset on external trigger
  useEffect(() => {
    if (reset) resetCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  // Notify parent when code changes
  useEffect(() => {
    codeFunc(code);
  }, [code, codeFunc]);

  // Autofill from insertCode
  useEffect(() => {
    if (insertCode && insertCode.length === CODE_LENGTH) {
      const upperCode = insertCode.toUpperCase();
      inputRefs.forEach((ref, i) => {
        if (ref.current) ref.current.value = upperCode[i] || '';
      });
      setCode(upperCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.toUpperCase().slice(0, 1);

    const newCodeArray = code.padEnd(CODE_LENGTH, ' ').split('');
    newCodeArray[index] = val;
    const newCode = newCodeArray.join('').trim();
    setCode(newCode);

    if (val && index < CODE_LENGTH - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const { key } = e;

    if ((key === 'Backspace' || key === 'Delete') && !e.currentTarget.value && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }

    if (key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs[index - 1]?.current?.focus();
    }

    if (key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      e.preventDefault();
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').toUpperCase().slice(0, CODE_LENGTH);
    if (pasted.length === CODE_LENGTH) {
      pasted.split('').forEach((char, i) => {
        const input = inputRefs[i]?.current;
        if (input) input.value = char;
      });
      setCode(pasted);
    }
  };

  const ClearButton = () => (
    <button
      type="button"
      aria-label="Obriši kod"
      onClick={resetCode}
      className="absolute right-[-30px] top-3 text-2xl"
    >
      <X />
    </button>
  );

  return (
    <div className={clsx("flex justify-center w-full items-center", className)}>
      <div className="flex items-center gap-2 relative">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            type="text"
            inputMode="text"
            maxLength={1}
            onChange={(e) => handleInput(e, index)}
            onFocus={handleFocus}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            autoFocus={index === 0}
            className="text-2xl w-10 p-2 text-center font-bold border bg-primary rounded-md focus:ring-0 focus:ring-offset-0"
          />
        ))}
        {code.length > 0 && <ClearButton />}
      </div>
    </div>
  );
};

export default CodeInput;
