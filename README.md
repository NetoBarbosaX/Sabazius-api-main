# REST API Template

This example shows how to implement a **REST API** using [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## Getting started

### 1. Download example and install dependencies

📥 Download this example:

📦 Install npm dependencies:
```
yarn install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered.  The seed file in [`prisma/seed.js`](./prisma/seed.js) will be executed and your database will be populated with the sample data.


### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

## Env File
```env
SECRET={{ramdom string}}
DATABASE_URL=mysql://root:@localhost/database
TOKEN_DURATION=3h

# ReCaptcha
RECAPTCHA_URL=https://www.google.com/recaptcha/api/siteverify
RECAPTCHA_SECRET=6LcUgnYUAAAAAOTAzcT04egqViuSeB_l8F4RrM3X
```
