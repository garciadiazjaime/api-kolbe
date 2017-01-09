import convict from 'convict';

// Define a schema
const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ipaddress: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'OPENSHIFT_NODEJS_IP',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'OPENSHIFT_NODEJS_PORT',
  },
  db: {
    url: {
      doc: 'Database hostname',
      format: String,
      default: 'mongodb://localhost:27017/kolbe',
      env: 'DB_URL',
    },
  },
  loggly: {
    token: {
      doc: 'Loggly token',
      format: String,
      default: '',
      env: 'LOGGLY_TOKEN',
    },
    subdomain: {
      doc: 'Loggly subdomain',
      format: String,
      default: '',
      env: 'LOGGLY_SUBDOMIAN',
    },
    username: {
      doc: 'Loggly username',
      format: String,
      default: '',
      env: 'LOGGLY_USERNAME',
    },
    password: {
      doc: 'Loggly password',
      format: String,
      default: '',
      env: 'LOGGLY_PASSWORD',
    },
  },
  alchemy: {
    apiUrl: {
      doc: 'Alchemy API URL',
      format: String,
      default: '',
      env: 'ALCHEMY_API_URL',
    },
    token: {
      doc: 'Alchemy token',
      format: String,
      default: '',
      env: 'ALCHEMY_TOKEN',
    },
  },
  secureToken: {
    doc: 'Our token',
    format: String,
    default: '',
    env: 'MINT_TOKEN',
  },
});

// Perform validation
config.validate({ strict: true });

export default config;
