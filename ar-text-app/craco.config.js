module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            'crypto': false,
            'stream': false,
            'buffer': false
          }
        }
      }
    }
  };