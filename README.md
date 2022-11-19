# Intro

This API was made using the boilerplate from this [Template](https://github.com/metachris/typescript-boilerplate) that provides an easy start for a TypeScript Node.js project

This is a simple API that implements a simple room reservation system. It opens endpoints that allow CRUD operations on a User, a Room and appartement, in addition to making it possible to reserve a room through the room endpoint.

# Technologies

|                       |            |
| --------------------- | ---------- |
| Language              | TypeScript |
| Server                | Node.js    |
| Framework             | Express    |
| Schema Validation     | Zod        |
| Database              | PostgreSQL |
| ORM & Database Client | Prisma     |

# Installation Guide

## Pre Requisites

- Node
- yarn
- .env file at project root

  - With your own postgreSQL databse URL

    ```ini
    # .env
    DATABASE_URL="postgres://..."
    ```

## Setup

1. Install dependencies

```bash
yarn
```

1. Initiate Prisma

```bash
npx prisma migrate dev --name init
```

1. Generate Prisma client

```bash
npx prisma generate
```

1. Start dev server

```bash
yarn dev
```

## Debug

1. Run Prisma Studio

```bash
npx prisma studio
```

## Deploy

2. Build

```bash
yarn build
```

1. Run build

```bash
yarn start
```

# Hosting

This API is hosted [here](https://ideal-octo-guacamole.onrender.com/)

# Docs

You will fond the API docs in the `{{host}}/docs` route.

- http://localhost:3000/docs by default on localhost
- http://localhost:{{PORT}}/docs by default on localhost
- https://ideal-octo-guacamole.onrender.com/docs hosted on render

# Libraries

## Zod

[Zod](https://github.com/colinhacks/zod) is a TypeScript Schema validator that I used to ensure the user input data (request body, params and path). It can also be used to generate TypeScript Typing

## Prisma

[Prisma](https://www.prisma.io/) is a TypeScript ORM that facilitates schema creation, migration, In addition to it being a really good data base client
