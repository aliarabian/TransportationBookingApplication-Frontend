const PROXY_CONFIG = [
  {
    context: [
      "/flights",
      "/users",
      "/terminals",
      "/auth"
    ],
    target: "http://localhost:8080",
    secure: false,
    logLevel: "debug",
    "pathRewrite": {
      "/registration": "/users/registration"
    },
  }
]

module.exports = PROXY_CONFIG;
