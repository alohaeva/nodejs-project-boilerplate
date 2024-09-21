# NodeJS Project Boilerplate

## Features

1. **Logging** - pino logger to add formatting, configuring transport, etc
2. **Input Validation** - zod to validate data in HTTP request
3. **Authentication**
4. **Authorization**
5. **Data Access Patterns**
   1. Repositories - access to data in DB performed strictly through repositories layer. Only repository has access to DB connection
   2. DTOs with schema validation
6. **Unit Tests**
7. **API Versioning** - at first there is `v1` version of the API
8. **Domain Model** - Maintaining the code based on the Domain Model (`/services`)
9. **Rate Limit**

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

## How to start server

**Prerequisites**

- NodeJS version - `22.4.0`

---

1. Install dependencies - `npm install`
2. Run development script to start server - `npm run dev`


## Project's Architecture Considerations

`index.ts` - file that exports `Server` class and initiate the server

`server.ts` - file that builds the Server class and all the dependencies. 

If there is a need to change framework, for example use Fastify instead of Express. Server class should be changed accordingly

`api/*` - NodeJS Framework specific implementation of API (For Express now)

`services/*` - Implementation of business logic




