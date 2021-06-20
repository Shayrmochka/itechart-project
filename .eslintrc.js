// module.exports = {
//   extends: ['airbnb', 'airbnb/hooks'],
//   rules: {
//     'linebreak-style': 0,
//     'no-underscore-dangle': ['error', { allow: ['_id'] }],
//   },
//   parser: 'babel-eslint',
//   env: {
//     browser: true,
//   },
// };

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb', 'airbnb/hooks',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }],
    'import/extensions': ['error', 'never'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'max-len': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
