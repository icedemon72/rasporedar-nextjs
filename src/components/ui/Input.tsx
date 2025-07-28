'use client';

import React, { HTMLInputTypeAttribute } from "react";

interface InputProps {
  id: string;
  inputVal: string;
  setVal: (val: string) => void;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  disabled?: boolean;
  min?: number;
  max?: number;
}

const Input: React.FC<InputProps> = ({ 
  id, inputVal, setVal, name, placeholder, type, disabled = false, min, max
}) => {
	return (
		<div className='form-control'>
			<label htmlFor={id} className="block w-full font-semibold">
				{ name }
			</label>
				{
					type !== 'number' ?
						<input
							type={type} id={id} name={id} placeholder={placeholder} value={inputVal}onChange={(e) => setVal(e.target.value)} disabled={disabled} required
							className="input-primary"
						/>
						:
						<input
							type={type} id={id} placeholder={name} value={inputVal} onChange={(e) => setVal(e.target.value)} disabled={disabled} autoComplete='off' required min={min} max={max}
							className="input-primary"
						/>
				}
		</div>
	);
};

export default Input;
