// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/

module.exports = {
  apps: [
    {
      name: 'server-dev',
      script: 'dist/server.js',
      node_args: '--inspect',

      min_uptime: 5000,
      max_restarts: 3,

      instances: 1,
      autorestart: true,
      watch: ['dist'],
      max_memory_restart: '256M',

      output: './logs/server-out.log',
      error: './logs/server-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',

      env: {
        NODE_ENV: 'staging',
        PORT: 3000,
      },
    },
    {
      name: 'server-stage',
      script: 'dist/server.js',

      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',

      min_uptime: 5000,
      max_restarts: 2,

      output: './logs/server-out.log',
      error: './logs/server-error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',

      env: {
        NODE_ENV: 'staging',
        PORT: 3000,
      },
    },
  ],
};
