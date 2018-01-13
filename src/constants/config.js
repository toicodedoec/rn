const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'Starter Kit',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? 'UA-84284256-2' : 'UA-84284256-1',

  __APP_API__: (devMode) ? 'http://albus-api-dev.us-east-2.elasticbeanstalk.com/api' : 'http://albus-api-dev.us-east-2.elasticbeanstalk.com/api'
};
