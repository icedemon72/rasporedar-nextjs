import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputVal: string;
  setVal: (val: string) => void;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ 
  inputVal, setVal, name, ...props
}) => {
	return (
		<div className="form-control">
			<label htmlFor={name} className="label-primary">{ name }</label>
			<textarea className="input-primary" {...props} id={name} onChange={(e) => setVal(e.target.value)} value={inputVal} />
		</div>
	)
}

export default Textarea;