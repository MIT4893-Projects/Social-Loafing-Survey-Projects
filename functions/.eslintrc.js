module.exports = {
  root: true,
  env: {
    es6: false,
    node: true,
  },
  extends: [
    // "eslint:recommended",
    "google",
  ],
  rules: {
    quotes: 0,
    indent: 0,
    "comma-dangle": 0,
    "quote-props": 0,
  },
  parserOptions: {
    ecmaVersion: 8 // or 2017
  }
};
