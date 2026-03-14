export default {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
  ],
  rules: {
    'prefer-const': 'warn',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
