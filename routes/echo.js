module.exports = {
  async echoRoute(fastify) {
    fastify.post("/echo", async (request) => {
      return request.body; // Echo the received data
    });
  },
};
