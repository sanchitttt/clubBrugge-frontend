interface Config {
    env: 'development' | 'production',
    BACKEND_ENDPOINT: string
}

const environment: "production" | 'development' = "production"

const config: Config = {
    'env': environment,
     'BACKEND_ENDPOINT': 'https://club-brugge-backend.vercel.app',
  //  'BACKEND_ENDPOINT': 'http://localhost:8082',
}

export default config;
