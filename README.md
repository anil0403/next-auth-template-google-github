<h1 align="center">Netflix Clone👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/anilshrestha43" target="_blank">
    <img alt="Twitter: anilshrestha43" src="https://img.shields.io/twitter/follow/anilshrestha43.svg?style=social" />
  </a>
</p>

> Next Js Authentication Template

### 🏠 [Homepage](https://nextjs-template-liart-nine.vercel.app/)

## Building a Fullstack Netflix Clone with NextJS, TailwindCSS, Prisma & MongoDB

Features:

- Environment, Typescript, NextJS Setup
- MongoDB & Prisma connect, Database creation
- Authentication with NextAuth, Google & Github Login
- React SWR data fetching
- Zustand state management

### Cloning the repository

```shell
git  https://github.com/anil0403/next-auth-template-google-github.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |

## Prisma Schema [mongoDB]

### user 

```shell
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  name           String
  image          String?
  email          String?   @unique
  emailVerified  DateTime?
  hashedPassword String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  accounts       Account[]
```

### account

```shell
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.String
  access_token      String? @db.String
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.String
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
```

## Author

👤 **Anil Shrestha**

* Twitter: [@anilshrestha43](https://twitter.com/anilshrestha43)
* Github: [@anil0403](https://github.com/anil0403)
* LinkedIn: [@anil-shrestha-6875591b5](https://linkedin.com/in/anil-shrestha-6875591b5)