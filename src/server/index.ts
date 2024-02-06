import http, { Server as HttpServer } from 'http';

import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { logger, loggerInstance } from '../logger';
import { appConfig } from '../config/Config';
import apiV1Router from '../api/v1';
import { testEventConsumer } from '../broker/consumers';
import { Broker } from '../broker';
import { publishTestEvent } from '../broker/publishers';

const domainUrl = appConfig.get('common.domainUrl');
const cookieSecret = appConfig.get('common.cookieSecret');
const brokerConnection = appConfig.get('connections.broker');

export class Server {
  app: Express;
  server: HttpServer;

  constructor() {
    const app = express();

    app.use(loggerInstance);

    this.catchUncaughtException();

    this.app = app;
    this.server = http.createServer(app);

    app.use(
      cors({
        origin: domainUrl,
        credentials: true,
      })
    );
    app.use(bodyParser.json());
    app.use(cookieParser(cookieSecret));

    app.use('/v1', apiV1Router);
  }

  async start(port: number) {
    if (brokerConnection) {
      await Broker.init(`${brokerConnection.protocol}://${brokerConnection.host}:${brokerConnection.port}`);

      await testEventConsumer();
      const data = await publishTestEvent({
        hello: 'world',
      });

      console.log(data);
    }

    this.server.listen(port);
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
