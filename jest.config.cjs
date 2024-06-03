/** @type {import('jest').Config} */
module.exports = {
  testMatch: ["**/__tests__/**/*.+(ts|tsx)", "**/?(*.)+(spec|test).+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx|css)$": [
      "@swc/jest",
      {
        // TODO: DRY with Webpack SWC config
        jsc: {
          parser: {
            syntax: "typescript",
            dynamicImport: true,
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  setupFiles: ["./jest.polyfills.cjs"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/**/*.mock.{ts,tsx}",
    "!<rootDir>/src/**/mocks/*",
    "!<rootDir>/src/setupTests.ts",
  ],
  verbose: true,
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
