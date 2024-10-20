module.exports = require('neostandard')({
  noStyle: true, // Disable style rules to avoid conflicts with Prettier (default: false)
  semi: true, // Enable semicolons to avoid conflicts with Prettier (default: false)
  ignores: ['node_modules'], // Ignore node_modules directory (default: []), replacement for .eslintignore
});
