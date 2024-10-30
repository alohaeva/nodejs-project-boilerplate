# Node.js Project Boilerplate

## Features

1. **Logging** - pino logger to add formatting, configuring transport, etc
2. **Input Validation** - `zod` to validate data in HTTP request
3. **AuthN** - some routes are behind simple JWT authorization, also separate auth route is configured to get tokens
4. **AuthZ**
   1. RBAC - AuthZ with user and admin roles
   2. SBAC - access resources based on requested scope (read/write)
5. **Data Access Patterns**
   1. Repositories - access to data in DB performed strictly through repositories layer. Only repository has access to DB connection
   2. DTO - schema validation, sanitizing request/response payload, transforming database data to DTO
6. **Unit Tests** - tests are implemented in `./tests` folder
7. **API Versioning** - at first there is `v1` version of the API
8. **Domain Model** - Maintaining the code based on the Domain Model (`/services`)
9. **Swagger Documentation** - JSDoc-first documentation
10. **Pagination** - offset-based pagination

## How to start server

**Prerequisites**

- Node.js version - `22.9.0`
- Make sure you have running local instance of MongoDB to connect and provide connection string in `./src/config/vars.ts`

1. Install dependencies - `npm install`
2. Run development script to start server - `npm run dev`


## How to test code

```shell
npm run test # to run all tests
npm run coverage # to run tests with coverage
```

## Project's Code Structure Considerations

`index.ts` - file that exports `Server` class and initiate the server

`server.ts` - file that builds the Server class and all the dependencies

If there is a need to change framework, for example use `Fastify` instead of `Express`. Server class should be changed accordingly

`api/*` - Node.js Framework specific implementation of API (For Express now)

`services/*` - Implementation of business logic
