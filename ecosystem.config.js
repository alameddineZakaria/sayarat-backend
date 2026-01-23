module.exports = {
  apps: [
    {
      name: "sayarat-backend",
      script: "./app.js",
      cwd: "/var/www/sayarat-backend",
      instances: 1,
      exec_mode:"fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
