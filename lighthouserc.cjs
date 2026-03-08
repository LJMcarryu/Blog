module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/zh", "http://localhost:3000/zh/blog"],
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready in",
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
        chromeFlags: "--no-sandbox --disable-gpu",
        // Skip performance category — Lighthouse 12 trace gathering crashes on Windows/MINGW
        onlyCategories: ["accessibility", "best-practices", "seo"],
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
