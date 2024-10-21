import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      prettier: prettier,
      '@typescript-eslint': typescript,
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint 기본 권장 규칙 추가
      ...react.configs.recommended.rules, // React 권장 규칙 추가
      ...typescript.configs['recommended'].rules, // TypeScript 권장 규칙 추가
      ...prettier.configs.recommended.rules, // Prettier 규칙 추가
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'react-hooks/rules-of-hooks': 'error', // 리액트 훅 규칙
      'react-hooks/exhaustive-deps': 'warn', // 의존성 규칙
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // 'css' prop을 무시하도록 추가
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
