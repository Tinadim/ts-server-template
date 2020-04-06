# Typescript Server Template

This project is a template for typescript servers using express and mongoose. Keep in mind that most of the files here are just examples and should by any means be used in a real project. The entry point of the project is in the `src/index.ts` file. When the application starts, it will register `module-alias` (required to resolve typescript paths) and `dotenv` (required to read the `.env` file). It will then connect to a local database and spin up an http server on the port indicated by the `process.env.PORT` variable.
The server exposes a couple of endpoints to be used as examples:

- [GET/POST] /health-check to be used by your deployment liveness probe
- [POST] /v1/hello-world an example of a regular API endpoint

Finally, the server also registers a shutdown handler that will be called when SIGINTs or SIGTERMs are issued or the application unexpectedly crashes (the handler only activates if `NODE_ENV === 'production'`)

## Project structure

```
- infrastructure // folder for infra related files like docker files, scripts and deployments
    | - docker // infra files related to docker
    |   | - .dockerignore // files to be ignored during docker build
    |   | - Dockerfile // dockerfile to be used during build
    | - kubernetes // infra files associated with kubernetes
    |   | - deployment.yaml // example of deployment
- src // actual project code
    | - @types // folder to hold custom .d.ts files
    |   | - mongoose // example of a project that needs a custom .d.ts
    |   |   | - index.d.ts // we have to define types for mongoose promise inside of a custom .d.ts as we're using bluebird
    | - api // folder that holds the code executed by the server
    |   | - health-check // files associated with the health-check endpoint
    |   |   | - index.ts // example of a health-check endpoint that can be used by kubernetes as a liveness probe
    |   | - v1 // code for v1 of the api. Everything used by this version of the api should be inside this folder
    |   |   | - lib // lib files that are used by v1 of the api only
    |   |   |   | - error-handler.ts // example of an error-handler for api-v1
    |   |   | - resources // routes and controllers for api v1 endpoints
    |   |   |   | - hello-world // example of an api resource
    |   |   |   |   | - hello-world-controller.ts // example of a controller that process api requests for the hello-world resource
    |   |   |   |   | - hello-world-router.ts // example of file that exposes endpoints associated with the hello-world resource
    |   |   | - index.ts // main api-v1 file. This is where additional middleware should be declared and routes are bootstrapped
    |   |   | - routes.ts // api-v1 routes
    |   | - index.ts // main api file. This is where different api versions are bootstrapped
    | - config // config files for the server
    |   | - app-setup.ts // construction of the express app and setting up of generic middleware used across the server
    |   | - database-setup.ts // connection to the database
    |   | - env.ts // file that registers dotenv
    |   | - http-server.ts // creation of the http server
    |   | - server-config.ts // config loader for the server
    |   | - shutdown-handler.ts // shutdown handler for the http server
    | - lib // generic libs that are shared across multiple files in the code
    | - index.ts // entry point of the code
    | - logger.ts // main logger class
- test
    | - jest.setup.ts // example of file that is called to setup jest for your tests
    | - tsconfig.test.json // tsconfig for test files only
- .editorconfig
- .env
- .gitignore
- package.json
- README.md
- tsconfig.json
- tslint.json
```