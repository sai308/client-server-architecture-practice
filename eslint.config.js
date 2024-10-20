const neostandard = require('neostandard');
const { resolveIgnoresFromGitignore } = neostandard;

module.exports = neostandard({
  noStyle: true, // Disable style rules to avoid conflicts with Prettier (default: false)
  semi: true, // Enable semicolons to avoid conflicts with Prettier (default: false)
  ignores: resolveIgnoresFromGitignore(), // Ignore node_modules directory (default: []), replacement for .eslintignore
});
