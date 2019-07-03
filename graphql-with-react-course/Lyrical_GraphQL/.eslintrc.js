module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2],
    semi: 0,
    'arrow-parens': 0,
    'comma-dangle': 0,
    'no-unused-expressions': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0
  }
}
