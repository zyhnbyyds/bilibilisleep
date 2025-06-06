module.exports = {
  apps: [
    {
      name: 'nestjs-app',
      script: '/usr/apps/bilibilisleep/app/dist/apps/bilibilisleep/main.js',
      exec_mode: 'cluster',
      instances: 3,
      watch: false,
      env: {
        NODE_ENV: 'dev',
      },
      env_production: {
        NODE_ENV: 'prod',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
    },
  ],
}
