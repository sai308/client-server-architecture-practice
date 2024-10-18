const { getResource } = require("./getResource");
const { getResources } = require("./getResources");
const { createResource } = require("./createResource");
const { updateResource } = require("./updateResource");
const { deleteResource } = require("./deleteResource");

const { buyResources } = require("./buyResource");

module.exports.resourcesRouter = async function (fastify, opts) {
  fastify.route(createResource);
  fastify.route(getResources);
  fastify.route(getResource);
  fastify.route(buyResources);
  fastify.route(updateResource);
  fastify.route(deleteResource);
};
