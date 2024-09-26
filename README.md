# NodeJS Project Boilerplate

## Features

1. **Logging** - pino logger to add formatting, configuring transport, etc
2. **Input Validation** - zod to validate data in HTTP request
3. **Unit Tests** - provide increased quality for the source code
4. **API Versioning** - at first there is `v1` version of the API
5. **Domain Model** - Maintaining the code based on the Domain Model (`/services`)

## Supported Templates

### Basic HTTP Server

```shell
git checkout main
```

### Basic HTTP server with RabbitMQ communication

```shell
git checkout boilerplate/microservice-rabbit-mq
````

### Basic HTTP server with MongoDB CRUD features

```shell
git checkout boilerplate/mongodb
````

### Basic HTTP server with AuthN and AuthZ

```shell
git checkout boilerplate/authorization
````

## How to start server

**Prerequisites**

- NodeJS version - `22.9.0`

1. Install dependencies - `npm install`
2. Run development script to start server - `npm run dev`

## Project's Architecture Considerations

`index.ts` - file that exports `Server` class and initiate the server

`server.ts` - file that builds the Server class and all the dependencies

If there is a need to change framework, for example use `Fastify` instead of `Express`. Server class should be changed accordingly

`api/*` - Node.js Framework specific implementation of API (For Express now)

`services/*` - Implementation of business logic
