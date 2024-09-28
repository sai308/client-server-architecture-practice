const { createResource } = require("./createResource");
const { getResource } = require("./getResource");
const { getResources } = require("./getResources");
const { updateResource } = require("./updateResource");
const { deleteResource } = require("./deleteResource");

module.exports.resourcesRouter = async function (fastify, opts) {
  fastify.route(createResource);
  fastify.route(getResources);
  fastify.route(getResource);
  fastify.route(updateResource);
  fastify.route(deleteResource);
};
