module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest/globals': true,
    'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react', 'jest', 'cypress'
  ],
  'rules': {
    'indent': [
      'warn',
      2,
      { 'SwitchCase': 2 }
    ],
    'linebreak-style': [
      'warn',
      'windows'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'never'
    ],
    'no-unused-vars': [
      'warn',
      { 'vars': 'local', 'args': 'after-used' }
    ],
    'react/prop-types': 0,
    'object-curly-spacing': [
      'warn',
      'always'
    ],
    'no-console': 0,
    'eqeqeq': 'warn',
    'no-trailing-spaces': 'warn',
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}
