import globals from 'globals';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
  {
    rules: {
      'no-extra-boolean-cast': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            multiline: true,
            minProperties: 1,
          },
        },
      ],
    },
  },
  eslintPrettier,
];
