module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    'linebreak-style': 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
  },

};
