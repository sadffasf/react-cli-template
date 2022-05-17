const { createProxyMiddleware: proxy } = require("http-proxy-middleware");

/*反向代理文件*/
module.exports = function (app) {
  app.use(
    proxy("/api", {
      target: "http://localhost:5000",
      // secure: false, //是否验证htpps的安全证书，如果域名是https需要配置此项
      changeOrigin: true, //必须设置为true
    })
  );
};
