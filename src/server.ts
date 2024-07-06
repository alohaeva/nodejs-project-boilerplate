import http, { Server as HttpServer } from 'http';

import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { logger, loggerInstance } from '../logger/index.ts';
import { appConfig } from '../config/Config.ts';
import apiV1Router from '../api/v1/index.ts';
import { testEventConsumer } from '../broker/consumers';
import { Broker } from '../broker';
import { publishTestEvent } from '../broker/publishers';

const domainUrl = appConfig.get('common.domainUrl');
const cookieSecret = appConfig.get('common.cookieSecret');
const brokerConnection = appConfig.get('connections.broker');
const port = appConfig.get('server.port');

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

  async start(port: number) {
    this.catchUncaughtException();

    if (brokerConnection && brokerConnection.enabled) {
      await Broker.init(`${brokerConnection.protocol}://${brokerConnection.host}:${brokerConnection.port}`);

      await testEventConsumer();
      const data = await publishTestEvent({
        hello: 'world',
      });

      console.log(data);
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
