module.exports = {
    apps: [{
      name: 'evetech-staging-app',
      script: 'npm',
      args: 'run dev',
      watch: false,
      env: {
        NODE_ENV: 'development',
        NEXT_PUBLIC_API_KEY: 'https://api-dev.evetech.co.za/api',
        PORT: 3001 // You can set your port here
      }
    }]
  };