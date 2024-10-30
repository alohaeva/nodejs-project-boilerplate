import { parseNumber } from '../utils/parse/parseNumber.ts';

export const PORT = parseNumber(process.env.PORT, 8000);
export const DOMAIN_URL = process.env.DOMAIN_URL ?? 'http://localhost:3000';
export const COOKIE_SECRET = process.env.DOMAIN_URL ?? 'cookieSecret';

export default {
  common: {
    domainUrl: DOMAIN_URL,
    cookieSecret: COOKIE_SECRET,
  },
  server: {
    port: PORT,
  },
  connections: {
    mongo: {
      // uri: 'mongodb://localhost:27017/test',
      uri: '',
    },
  },
};
