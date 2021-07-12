module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["svelte3", "@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    // 使ってない変数を残さない（_varsはチェックしない）
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    // import type を使うルール
    "@typescript-eslint/consistent-type-imports": ["error"],
    "@typescript-eslint/naming-convention": [
      "error",
      // camelCaseかUPPER_CASEの強制
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      // TypeはPascalCase
      {
        selector: "typeAlias",
        format: ["PascalCase"],
      },
      // // ClassはPascalCase
      {
        selector: "class",
        format: ["PascalCase"],
      },
      // // booleanの変数はprefixをつける
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "should", "has", "can", "did", "will"],
      },
      // // InterfaceはIをつける
      {
        selector: "interface",
        format: ["PascalCase"],
        prefix: ["I"],
      },
    ],
    // 厳密等価演算子を強制
    eqeqeq: "error",
    // caseのdefaultを必ずつける
    "default-case": "error",
  },
};
