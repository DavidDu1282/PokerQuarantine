// FOR DEVELOPMENT ENV. Allows the client to call api from server side.
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:3001",
    })
  );
};
