import * as dotenv from 'dotenv';
import * as path from 'path';

// ENV

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});
const { PORT } = process.env;
const { NODE_ENV } = process.env;
const { MONGO_CONNECTION_STRING } = process.env;
const { JWT_SECRET_KEY } = process.env;
const { AUTH_MODE } = process.env;
const { POSTGRESS_HOST } = process.env;
const { POSTGRESS_PORT } = process.env;
const { POSTGRES_PASSWORD } = process.env;
const { POSTGRES_USER } = process.env;
const { POSTGRES_DB } = process.env;
const { USE_FASTIFY } = process.env;

// Routes
const EXCLUDE_ROUTES = ['/doc', '/', '/login'];

export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  EXCLUDE_ROUTES,
  POSTGRESS_HOST,
  POSTGRESS_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB,
  USE_FASTIFY,
};
