# NodeJS Project Boilerplate

## Implemented based on Best API Development Patterns

1. **Logging** - pino logger to add formatting, configuring transport, etc
2. **Input Validation**
3. **Authentication**
4. **Authorization**
5. **Data Access Patterns** - DTOs, Repositories
6. **Unit Tests**
7. **API Versioning**
8. **Domain Model** - Maintaining the code based on the Domain Model (`/services`)
9. **Rate Limit**

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

`api/*` - NodeJS Framework specific implementation of API (For Express now). This folder imports all the data in `routes` folder

`routes/*` - Implementation of routes for api, should not depend on NodeJS Framework

`services/*` - Implementation of business logic




