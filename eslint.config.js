import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default [
  // 1️⃣ global ignore patterns
  globalIgnores([
    "dist/",
    "node_modules/",
    "src/generated/", // ignore generated Prisma client
    "prisma.config.ts", // ignore Prisma config
  ]),

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // TypeScript best practices
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Node.js
      "no-console": "off",
    },
  },

  prettierConfig,
];
