module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'warn',
            4
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
        'react/prop-types': [
            'warn'
        ],
        'object-curly-spacing': [
            'warn',
            'always'
        ],
        'no-console': 0
    }
}
