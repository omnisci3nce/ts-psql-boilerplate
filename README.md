# postgresql-repo

## Features

- Generic CRUD for easy setup of new entities (see: `src/crud.ts`)

## Setup

postgres

`docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

pgadmin

`docker run --name pg_dashboard -p 5488:80 -e PGADMIN_DEFAULT_EMAIL=josh@josh.com -e PGADMIN_DEFAULT_PASSWORD=josh -d dpage/pgadmin4`
