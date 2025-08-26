'use client';

import React, { HTMLInputTypeAttribute } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  inputVal: string;
  setVal: (val: string) => void;
  name: string;
  type?: HTMLInputTypeAttribute;
}

const Input: React.FC<InputProps> = ({ 
  id, 
	inputVal, 
	setVal, 
	name,
	type = 'text', 
	disabled = false, 
	required = true, 
	...rest 
}) => {
	return (
		<div className='form-control'>
			<label htmlFor={id} className="label-primary">
				{ name }
			</label>
				{
					type !== 'number' ?
						<input
							type={type} id={id} name={id}  value={inputVal} onChange={(e) => setVal(e.target.value)} disabled={disabled} {...rest}
							className="input-primary"
						/>
						:
						<input
							type={type} id={id} placeholder={name} value={inputVal} onChange={(e) => setVal(e.target.value)} disabled={disabled} autoComplete='off' { ...rest }
							className="input-primary"
						/>
				}
		</div>
	);
};

export default Input;