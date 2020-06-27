module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
  overrides: [
    {
      files: [
        'src/**/*.test.js',
        'src/**/*.test.jsx',
        'src/setupTests.js',
      ],
      plugins: ['jest'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'import/prefer-default-export': 0,
      },
      env: {
        'jest/globals': true,
      },
    },
  ],
};
