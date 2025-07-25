import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "standard",
    // "plugin:tailwindcss/recommended",
    "prettier"
  ),
  {
    rules: {
      "no-undef": "off",
    },
  },
];