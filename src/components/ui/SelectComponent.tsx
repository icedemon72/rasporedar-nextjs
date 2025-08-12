import { OptionType } from '@/types/global';
import dynamic from 'next/dynamic';
import React from 'react';
import type { Props as SelectProps, StylesConfig, GroupBase, ActionMeta, SingleValue, MultiValue } from 'react-select';

const Select = dynamic(
	() => import('react-select').then((mod) => mod.default) as Promise<React.ComponentType<SelectProps<OptionType, boolean, GroupBase<OptionType>>>>,
	{ 
		ssr: false,
		loading: () => (
			<div className="input-primary css-hlgwow">
				<div className="css-1jqq78o-placeholder">
					<div className="css-1s80ejz-dummyInput-DummyInput">
						<span className="text-muted">Učitavanje...</span>
					</div>
				</div>
			</div>
		)
	}
);

interface SelectComponentProps {
  data: OptionType[];
  placeholder?: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  isMulti?: boolean;
  value?: SingleValue<OptionType> | MultiValue<OptionType>;
  setVal: (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  required?: boolean;
  theme?: 'light' | 'dark';
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  data,
  placeholder = 'Izaberite vrednost',
  isClearable = true,
  isSearchable = true,
  isMulti = false,
  value = null,
  setVal,
  required = false,
  theme = 'light',
}) => {
  const main = 'white';
  const WnB = 'black';

  const customStyles: StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: theme === 'dark' ? 'rgb(31, 41, 55)' : 'white',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 6,
      zIndex: 1,
      "&:hover": {
        borderColor: "#e5e7eb",
      },
      '&:focus': {
        borderColor: "e5e7eb",
      },
      '&:active': {
        borderColor: "e5e7eb",
      },
    }),
    menu: base => ({
      ...base,
      zIndex: 10,
      top: '100%',
      bottom: 'auto',
      borderRadius: 6,
    }),
    menuList: base => ({
      ...base,
      backgroundColor: main,
      borderWidth: 1,
      borderColor: 'e5e7eb',
      borderRadius: 6,
    }),
    option: (styles, { isDisabled }) => ({
      ...styles,
      backgroundColor: main,
      borderColor: main,
      color: WnB,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      '&:hover': {
        backgroundColor: theme === 'dark' ? 'rgb(31, 41, 55)' : 'black',
        color: 'white',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: main,
      color: WnB,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: WnB,
    }),
    singleValue: (base) => ({
      ...base,
      color: WnB,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <Select
      className="w-full"
      placeholder={<span className="text-muted">{placeholder}</span>}
      value={value}
      options={data}
      styles={customStyles}
      required={required}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isMulti={isMulti}
      maxMenuHeight={250}
      onChange={setVal}
      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
    />
  );
};

export default SelectComponent;
