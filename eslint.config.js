import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "src/components/server.js"],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["*.config.{js,ts}", "ai-backend/**/*.js", "netlify/functions/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        fetch: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["vite.config.ts"],
    rules: {
      "no-var": "off",
    },
  }
);
