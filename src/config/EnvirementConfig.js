const dev = {
    API_ENDPOINT_URL: 'https://localhost:5001/'
  };
  const prod = {
    API_ENDPOINT_URL: ''
  };
  
  const test = {
    API_ENDPOINT_URL: 'https://localhost:5001/'
  };
  
  const getEnv = () => {
      switch (process.env.NODE_ENV) {
          case 'development':
              return dev
          case 'production':
              return prod
          case 'test':
              return test
          default:
              break;
      }
  }
  
  export const env = getEnv()
  