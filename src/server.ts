import http, { Server as HttpServer } from 'http';

import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { logger, loggerInstance } from './logger/index.ts';
import { appConfig } from './config/Config.ts';
import apiV1Router from './api/v1/index.ts';
import MongoDBConnection from './connectors/mongo/index.ts';

const domainUrl = appConfig.get('common.domainUrl');
const cookieSecret = appConfig.get('common.cookieSecret');
const port = appConfig.get('server.port');
const mongodb = appConfig.get('connections.mongo');

export class Server {
  app: Express;
  server: HttpServer;

  constructor() {
    this.app = express();

    this.app.use(loggerInstance);
    this.server = http.createServer(this.app);
    this.app.use(
      cors({
        origin: domainUrl,
        credentials: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(cookieParser(cookieSecret));

    this.app.use('/v1', apiV1Router);
  }

  async start() {
    this.catchUncaughtException();

    if (mongodb?.uri) {
      await MongoDBConnection.connect({
        uri: mongodb.uri,
      });
    }

    this.server.listen(port, () => {
      logger.info(`Server is running at http://localhost:${port}`);
    });
  }

  catchUncaughtException() {
    process.on('uncaughtException', err => {
      // log the exception
      logger.fatal(err, 'uncaught exception detected');

      this.server.close();
      // shutdown the server gracefully
      process.exit(1); // then exit
    });
  }
}
