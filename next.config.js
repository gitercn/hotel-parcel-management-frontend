const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    BACKEND_URL: isDev
      ? 'http://localhost:8080/api' // Development API
      : 'https://your-deployment.server/api' // Production API
  };

  return {
    env,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${env.BACKEND_URL}/:path*` // Proxy to Backend
        }
      ];
    },
    sassOptions: {
      includePaths: ['./styles'],
    },
  };
};
