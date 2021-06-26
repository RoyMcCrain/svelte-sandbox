module.exports = {
  parser: "@typescript-eslint/parser", // add the TypeScript parser
  plugins: [
    "svelte3",
    "@typescript-eslint", // add the TypeScript plugin
  ],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    extraFileExtensions: [".svelte"],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    // 使ってない変数を残さない（_varsはチェックしない）
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // import type を使うルール
    "@typescript-eslint/consistent-type-imports": ["error"],
    "@typescript-eslint/naming-convention": [
      "error",
      // camelCaseかUPPER_CASEの強制
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
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
        custom: {
          regex: "send|start|find",
          match: false,
        },
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
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
    ],
    // 厳密等価演算子を強制
    eqeqeq: "error",
    // caseのdefaultを必ずつける
    "default-case": "error",
  },
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
};
