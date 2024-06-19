module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-debugger": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn", // types de retour non déclarés
    "@typescript-eslint/no-explicit-any": "error", // any utilisé comme type
    "@typescript-eslint/no-unused-vars": "warn", // variables non utilisées
    "@typescript-eslint/no-non-null-assertion": "error", // opérateur '!' utilisé
    "@typescript-eslint/no-empty-function": "warn", // fonctions vides
    "@typescript-eslint/no-floating-promises": "error", // promesses non traitées
    "@typescript-eslint/no-misused-promises": "error", // Erreur si mauvaise utilisation des promesses
    "@typescript-eslint/no-var-requires": "warn", //import plutot que require
  },
};
