const PROXY_CONFIG = [
  {
    context: [
      "/flights",
      "/users",
      "/terminals",
      "/auth",
      "/countries"
    ],
    target: "https://localhost:8443",
    changeOrigin: true,
    secure: false,
    logLevel: "debug",
    // "pathRewrite": {
    //   "/registration": "/users/registration"
    // },
  }
]

module.exports = PROXY_CONFIG;
