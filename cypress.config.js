const { defineConfig } = require('cypress');

module.exports = defineConfig({
  videoCompression: 15,
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      hideXHR: true,
    },
  },
});
