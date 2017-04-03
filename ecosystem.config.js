if (process.env.NODE_ENV !== 'staging' &&
    process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  apps: [{
    name: 'delighted',
    watch: false,
    script: './src/server.js',
    instances: 1,
    exec_mode: 'cluster',
    wait_ready: false,
    kill_timeout: 1800,
    max_restarts: 20,
    max_memory_restart: '1G',
    listen_timeout: 2000,
    env: {
      NODE_ENV: 'development',
      DELIGHTED_PORT: 3003
    },
    env_test: {
      NODE_ENV: 'test',
      DELIGHTED_PORT: 3003
    },
    env_staging: {
      NODE_ENV: 'staging',
      DELIGHTED_PORT: 3003
    },
    env_production: {
      NODE_ENV: 'production',
      DELIGHTED_PORT: 3003,
      DEBUG: 'delighted:*',
      DEBUG_COLORS: true
    }
  }],
  deploy: {
    production: {
      key: process.env.SSH_KEY || null,
      user: '[USER]',
      host: ['[EC2_ELASTIC_IP_ADDRESS]'],
      ref: 'origin/master',
      repo: 'git@github.com:hlibco/delighted.git',
      path: '/var/www/delighted',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      'pre-setup': 'sudo mkdir -p /var/www/delighted && sudo chown [USER]:[GROUP] -R /var/www/delighted',
      'post-setup': 'ls -la',
      'post-deploy': 'yarn cache clean && yarn install --production && npm run production',
      'pre-deploy-local': `echo 'This is a local executed command'`
    }
  }
}
