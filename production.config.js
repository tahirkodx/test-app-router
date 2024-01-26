module.exports = {
    apps: [{
      name: 'evetech-production-app',
      script: 'npm',
      args: 'start',
      watch: false,
      env_production: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_KEY: 'https://api.evetech.co.za/api',
        PORT: 3000 // You can set your port here
      }
    }]
  };