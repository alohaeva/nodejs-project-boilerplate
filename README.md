# Node.js Project Boilerplate

## Features

1. **Logging** - pino logger to add formatting, configuring transport, etc
2. **Input Validation** - `zod` to validate data in HTTP request
3. **AuthN** - some routes are behind simple JWT token authorization, also separate auth route is configured to get tokens
4. **AuthZ** - **to be implemented**
5. **Data Access Patterns**
   1. Repositories - access to data in DB performed strictly through repositories layer. Only repository has access to DB connection
   2. DTO - schema validation and sanitizing the request and response payload for HTTP requests
6. **Unit Tests** - **to be implemented**
7. **API Versioning** - at first there is `v1` version of the API
8. **Domain Model** - Maintaining the code based on the Domain Model (`/services`)

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

- Node.js version - `22.9.0`
- Make sure you have running local instance of MongoDB to connect and provide connection string in `./src/config/vars.ts`

1. Install dependencies - `npm install`
2. Run development script to start server - `npm run dev`

## Project's Architecture Considerations

`index.ts` - file that exports `Server` class and initiate the server

`server.ts` - file that builds the Server class and all the dependencies

If there is a need to change framework, for example use `Fastify` instead of `Express`. Server class should be changed accordingly

`api/*` - Node.js Framework specific implementation of API (For Express now)

`services/*` - Implementation of business logic
