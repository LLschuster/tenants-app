import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  {ignores: ["public/**/*", "dist/**/*","node_modules/**/*"]},
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
];