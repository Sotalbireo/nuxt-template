// @ts-check

import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
// @ts-ignore @types/eslint-plugin-tailwindcss does not exists
import tailwind from 'eslint-plugin-tailwindcss'

import withNuxt from './.nuxt/eslint.config.mjs'

/**
 * @see https://eslint.nuxt.com/packages/module
 */
export default withNuxt(
  {
    ignores: [
      '**/.husky/**',
      '**/public/**',
      '**/tests/result/**',
    ],
    name: 'Ignore files globally',
  },
  {
    name: 'js:recommended',
    ...js.configs.recommended,
  },
  tailwind.configs['flat/recommended'],
  {
    name: 'plugin:simple-import-sort',
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/order': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  {
    name: 'stylistic:recommended',
    ...stylistic.configs['recommended-flat'],
  },
  {
    name: 'custom rules',
    rules: {
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        enums: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        generics: 'always',
        imports: 'always-multiline',
        objects: 'always-multiline',
        tuples: 'always-multiline',
      }],
      '@stylistic/quotes': ['error', 'single', {
        allowTemplateLiterals: true,
        avoidEscape: true,
      }],
      '@typescript-eslint/no-explicit-any': ['error', {
        fixToUnknown: false,
        ignoreRestArgs: true,
      }],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^(props|_)',
      }],
      'no-unused-vars': 'off',
      'tailwindcss/no-custom-classname': ['warn', {
        whitelist: ['container-fluid'],
      }],
      'vue/html-indent': ['error', 2, {
        baseIndent: 0,
      }],
      'vue/multi-word-component-names': ['warn', {
        ignores: [
          'index',
          'plain',
          '[...slug]',
        ],
      }],
      'vue/no-multiple-template-root': 'off',
      'vue/valid-v-slot': ['error', {
        allowModifiers: true,
      }],
    },
  },
)
  .override('tailwindcss:base', {
    settings: {
      tailwindcss: {
        config: 'tailwind.config.ts',
        removeDuplicates: true,
        skipClassAttribute: false,
      },
    },
  })
