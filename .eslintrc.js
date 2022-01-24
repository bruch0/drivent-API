module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "comma-spacing": ["error", { before: false, after: true }],
    "semi-spacing": ["error", { before: false, after: true }],
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", { beforeColon: false }],
    "padded-blocks": ["error", "never"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "eol-last": ["error", "always"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
    ],
    "@typescript-eslint/type-annotation-spacing": ["error", { after: true, before: false }],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": "warn",
  },
};
