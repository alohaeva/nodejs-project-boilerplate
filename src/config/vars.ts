import { parseNumber } from '../utils/parse/parseNumber.ts';
import { parseString } from '../utils/parse/parseString.ts';

export const PORT = parseNumber(process.env.PORT, 8000);
export const DOMAIN_URL = parseString(process.env.DOMAIN_URL, 'http://localhost:3000');
export const COOKIE_SECRET = parseString(process.env.DOMAIN_URL, 'cookieSecret');

export default {
  common: {
    domainUrl: DOMAIN_URL,
    cookieSecret: COOKIE_SECRET,
  },
  server: {
    port: PORT || 8000,
  },
  connections: {
    mongo: {
      uri: 'mongodb://localhost:27017/test',
    },
  },
};
