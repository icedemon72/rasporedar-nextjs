import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from 'eslint-config-next';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,

  next(),

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      // Indentation and formatting
      indent: ['error', 2, { SwitchCase: 1 }],
      '@typescript-eslint/indent': ['warning', 2],
      'react/jsx-indent': ['warning', 2],
      'react/jsx-indent-props': ['warning', 2],

      // Style rules
      semi: ['warning', 'always'],
      quotes: ['warning', 'single'],
      '@typescript-eslint/no-unused-vars': ['warn'],

      // Disable import order rules
      'import/order': 'off',
      'sort-imports': 'off',

      // Next.js already disables this, but just in case
      'react/react-in-jsx-scope': 'off',
    },
  },
];
