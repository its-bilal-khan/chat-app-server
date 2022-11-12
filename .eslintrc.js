module.exports = {
  env: {
    es2021: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'import'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto' },
      { usePrettierrc: true },
    ], // Use our .prettierrc file as source
    'no-duplicate-imports': ['error', { includeExports: true }],
    camelcase: ['error', { properties: 'always', ignoreDestructuring: true }],
    'import/no-unresolved': [
      2,
      {
        commonjs: true,
        amd: true,
      },
    ],
  },
};
