// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021
  },
  rules: {
    eqeqeq: ['warn', 'always', { null: 'never' }],
    'no-debugger': ['error'],
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-process-exit': 'off',
    'no-useless-escape': 'off',
    'prefer-const': [
      'warn',
      {
        destructuring: 'all'
      }
    ],

    'node/no-missing-import': [
      'error',
      {
        allowModules: [
          'types',
          'estree',
          'testUtils',
          'less',
          'sass',
          'stylus'
        ],
        tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
      }
    ],
    'node/no-deprecated-api': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-unsupported-features/es-syntax': 'off',

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] }
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' }
    ]
  },
  overrides: []
})
