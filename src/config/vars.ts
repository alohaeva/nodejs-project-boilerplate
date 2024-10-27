import { parseNumber } from '../utils/parse/parseNumber.ts';

export const PORT = parseNumber(process.env.PORT, 8000);
export const DOMAIN_URL = process.env.DOMAIN_URL ?? 'http://localhost:3000';
export const COOKIE_SECRET = process.env.COOKIE_SECRET ?? 'cookieSecret';
export const BROKER_PORT = parseNumber(process.env.BROKER_PORT, 5672);
export const BROKER_HOST = process.env.BROKER_HOST ?? 'localhost';
export const BROKER_PROTOCOL = process.env.BROKER_PROTOCOL ?? 'amqp';

export default {
  common: {
    domainUrl: DOMAIN_URL,
    cookieSecret: COOKIE_SECRET,
  },
  server: {
    port: PORT,
  },
  connections: {
    broker: {
      enabled: false,
      host: BROKER_HOST,
      port: BROKER_PORT,
      protocol: BROKER_PROTOCOL,
    },
  },
};
