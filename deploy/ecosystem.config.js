module.exports = {
  apps: [{
    name: 'vpnspan-backend',
    script: 'server.js',
    cwd: '/var/www/vpnspan/backend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/pm2/vpnspan-error.log',
    out_file: '/var/log/pm2/vpnspan-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '300M',
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s'
  }]
}
