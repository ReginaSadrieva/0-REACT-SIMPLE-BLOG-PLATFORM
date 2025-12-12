import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // Игнорируем сборку и node_modules
  { ignores: ['dist', 'node_modules'] },

  // JS рекомендованные правила
  js.configs.recommended,

  // TypeScript рекомендованные правила
  ...tseslint.configs.recommended,

  // React рекомендованные правила (в виде объекта, а НЕ строки!)
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'], // важно для React 17+

  // Prettier — в самом конце
  prettierConfig,

  // ← объект, а не строка

  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },

    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      react: {
        version: 'detect', // автоматически найдёт 18.x
      },
    },

    rules: {
      // React Hooks правила
      ...reactHooks.configs.recommended.rules,

      // Vite + React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Prettier как ошибка ESLint
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      // Отключаем устаревшие правила
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Полезные строгие правила (можно ослабить позже)
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);
