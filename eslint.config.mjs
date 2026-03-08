import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

// Full jsx-a11y recommended rules — eslint-config-next only enables ~6 of 30+
const a11yRules = { ...jsxA11y.flatConfigs.recommended.rules };

const eslintConfig = defineConfig([
  ...nextVitals.map((config) => {
    // Merge full a11y rules into the config object that already has the jsx-a11y plugin
    if (config.plugins?.["jsx-a11y"]) {
      return { ...config, rules: { ...config.rules, ...a11yRules } };
    }
    return config;
  }),
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
