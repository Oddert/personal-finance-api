# Personal Finance API

A front end agnostic, microservice API for the Personal Finance system using Typescript, Objection and Knex.

Personal Finance is a spending and savings analytics system for an individual to use. Intended to work as a "data CMS", the backend is focused on different ways to serve up sanitised past spending data.

For the Web Front end see: [Personal Finance Web](https://github.com/Oddert/personal-finance-web/).

## Getting Started

Two sets of getting started instructions are provided as a container config is provided for production releases. See "Run with Docker" bellow.

To get started running the project locally, this isn't needed, follow the "Run locally" section bellow.

### Run Locally

In development mode the application uses a sqlite3 database so does not require you to run an separate database.

#### Install the packages

```bash
npm install
```

#### Instantiate the database

This step creates the Sqlite database and seeds with with sample data to develop with.

This can be done at any time to reset the database, simply delete `dist/db/personal-finance.dev.db3` or delete the entire `dist` folder and repeat the following.

```bash
npm run db:build
```

#### Run the development server

```bash
npm start
```

### Run with Docker

While no production development exists, docker is provided as a path to deploy if desired.

Three docker compose files are provided for each environment, you can use the `-f` command to build for the different environments.

NOTE: A development docker image is provided, however this is just for completeness as there isn't really a use-case for Dockerising development.

Available compose files:

- docker-compose-development.yml
- docker-compose-staging.yml
- docker-compose-production.yml

```bash
docker compose -f docker-compose-{environment}.yml up
```

## Application Environments

The application uses a three deployment environments

- development: Intended for local development. Uses a SQlite3 database and runs seeds. Some analytics such as the `/debug` routes are enabled.
- staging: Intended to duplicate production to perform System Integration Testing and User Acceptance Testing.
- production: Runs the application in a performant mode. Uses a Postgres database. Runs a cluster of instances defined by `process.yml`.

## NPM Scripts

script | description
---|---
test | Runs the test suite once.
test:watch | Runs the test suite in watch mode.
test:specific:watch | Runs the test suite in watch mode with the ability to specify a path.
test:coverage | Runs the test suite with a coverage report.
start | Runs the development server in "development" mode.
start:staging | Runs the build in "staging" mode.
start:production | Runs the build in "production" mode.
build | Creates a build.
build:watch | Runs the build script in watch mode.
db:migrate | Runs the Knex migrations.
db:seed | Runs the Knex seeds.
db:build | Re-creates the SQLite database, runs the migration and seeds.
lint | Runs the linter.
lint:fix | Runs the linter and attempts to fix auto-fixable problems.
