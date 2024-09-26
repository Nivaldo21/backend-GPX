
# GPX Technical Test - Server

Backend program developed with Node 20.11.1, Express, TypeScript, Prisma ORM, MySql


## Installation and Set up

Install with npm

```bash
  npm install
```

Create a .env file and add 
 - Create .env with command
```bash
  touch .env
```
```bash
  DATABASE_URL="mysql://username:password@localhost:port/database_name"
```

Run the migrations and seeder with prisma (the repository already contains a migration called init)
```bash
  npx prisma migrate reset
  npx prisma db seed
```

Set up server

```bash
  npm start
```
the server will be run in **http://localhost:3000/**
## Authors

- [@Nivaldo21](https://github.com/Nivaldo21)

