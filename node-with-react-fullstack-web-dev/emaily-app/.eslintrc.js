module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['mocha', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'keyword-spacing': [
      'error',
      {
        overrides: {
          if: { after: false }
        }
      }
    ],
    eqeqeq: ['error', 'always'],
    indent: ['error', 2],
    // 'operator-linebreak': ['error', 'none'],
    'comma-dangle': [
      'error',
      {
        arrays: 'ignore',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'no-unused-expressions': 'off',
    //mocha/testing rules
    'mocha/no-exclusive-tests': 'error'
    // enable prettier (un comment this line to appear as error in run time)
    //'prettier/prettier': 'error'
  },
  globals: {
    expect: true,
    sinon: true
  }
}
