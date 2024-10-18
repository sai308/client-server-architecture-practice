const { getRecipe } = require("./getRecipe");

module.exports.recipesRouter = async function (fastify, opts) {
  fastify.route(getRecipe);
};
