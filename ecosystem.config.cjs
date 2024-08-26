module.exports = {
  apps: [
    {
      name: "Splintercon showcases",
      port: "5000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        NODE_ENV: "production",
      },
      watch: true,
      watch_delay: 1000,
      ignore_watch: ["node_modules", "logs"],
    },
  ],
};
