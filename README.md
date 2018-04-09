# Hacker News Clone Server

[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/risan/hackernews-clone-server)
[![License](https://img.shields.io/github/license/risan/hackernews-clone-server.svg)](https://github.com/risan/hackernews-clone-server/blob/master/LICENSE.md)

A GraphQL server for [Hacker News](https://news.ycombinator.com/) clone. Powered by [graphql-yoga](https://github.com/graphcool/graphql-yoga) and [Prisma](https://www.prisma.io/). This project is based on the Node.js tutorial on [How to GraphQL](https://www.howtographql.com/)

Checkout the [GraphQL playground demo](https://talented-prosecution.glitch.me/).

![GraphQL Playground](https://res.cloudinary.com/risan/image/upload/v1523247915/hackernews-clone-server_c8figs.png)

> ⚠️ This demo is using Prisma development account
>
> Note that this demo is using a free Prisma development account. The API access is limited to 1 request per second.

## Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
    1. [Clone the Repository](#1-clone-the-repository)
    2. [Install the Dependencies](#2-install-the-dependencies)
    3. [Create Configuration Files](#3-create-configuration-files)
    4. [Deploy Your Prisma Service](#4-deploy-your-prisma-service)
    5. [Configure the Environment Variables](#5-configure-the-environment-variables)
    6. [Run the Application](#6-run-the-application-)
* [Query Examples](#query-examples)
    * [Get the Feed](#get-the-feed)
    * [Signing Up](#signing-up)
    * [Logging In](#logging-in)
    * [Create a New Post](#create-a-new-post)
    * [Vote for a Post](#vote-for-a-post)
    * [Subscribe to a New Post](#subscribe-to-a-new-post)
    * [Subscribe to a New Vote](#subscribe-to-a-new-vote)

## Requirements

The following items are required to run this React application:

* [Node.js](https://nodejs.org) version 8 or higher
* [`prisma`](https://github.com/graphcool/prisma)
* [`graphql-cli`](https://github.com/graphql-cli/graphql-cli) (Optional if you want an integrated playground)

## Installation

### 1. Clone the Repository

Clone this repository to your computer:

```shell
$ git clone git@github.com:risan/hackernews-clone-server.git
```

### 2. Install the Dependencies

On your terminal, go to the project directory and install all of the required dependencies:

```shell
# Go to the project directory.
$ cd hackernews-clone-server

# Install all of the dependencies.
$ npm install

# Or if you prefer to use Yarn.
$ yarn install
```

Next, you need to install the [`prisma` CLI](https://github.com/graphcool/prisma):

```shell
# Install prisma globally
$ npm install -g prisma
```

If you want your app and the Prisma API integrated together within one playground, you'll need to install [`graphql-cli`](https://github.com/graphql-cli/graphql-cli):

```shell
# Install graphql-cli globally
$ npm install -g graphql-cli
```

### 3. Create Configuration Files

There are two configuration files that you need to create: `database/prisma.yml` and `.graphqlconfig.yml`.

#### Create Prisma Service Configuration File

The `database/prisma.yml` is for the Prisma service configuration. Copy it from the provided example:

```shell
# Copy the Prisma service configuration example.
$ cp database/prisma.example.yml database/prisma.yml
```

Open the copied `database/prisma.yml` file. The only thing that you need to update is the `secret` directive, but you're free to update any other configuration directives.

```yml
# The service name, this will be part of our Prisma API URL.
# You may leave it or update it to anything you want.
service: hackernews-clone-server

# The deployment stage, this will also be part of our Prima API URL.
# You may leave it or update it to anything you want but the value usually:
# dev, staging or production
stage: dev

# File that holds the datamodel.
# Leave it be, unless you rename the provided datamodel file.
datamodel: datamodel.graphql

# The secret for JWT authentication.
# Update this value to your own choice, it can be anything. This secret will be
# used to generate the JWTs to authenticate againsts the Prisma API.
secret: YourPrismaSecret
```

#### Copy the GraphQL Configuration File

The `.graphqlconfig.yml` is the GraphQL configuration file that will be used both by the Prisma and the `graphql-cli` tools:

```shell
$ cp .graphqlconfig.example.yml .graphqlconfig.yml
```

You can leave this configuration file to its default setting. Unless you want to change your application's endpoint or the schema file location.

```yml
projects:
  app:
    schemaPath: src/schema.graphql
    extensions:
      endpoints:
        default: http://localhost:4000
  database:
    schemaPath: src/generated/prisma.graphql
    extensions:
      prisma: database/prisma.yml
```

### 4. Deploy Your Prisma Service

Deploy your Prisma service by running the following command on your terminal:

```shell
$ prisma deploy
```

The Prisma CLI will prompt you to select the cluster to which it will deploy the service. If you're just testing or learning, you use the development cluster which is completely free!

Once the service is deployed, you'll get your Prisma GraphQL API endpoint printed on the terminal. You can also type the following command to get your Prisma endpoint:

```shell
$ prisma info
```

Also don't forget to run the `prisma deploy` command again if you make any changes to the `database/datamodel.graphql` schema.

### 5. Configure the Environment Variables

Next you need to configure the environment variables for this app. Copy the provided `.env.example` file to `.env`:

```shell
cp .env.example .env
```

Open the `.env` file and update it to suit your configuration:

```
PORT=4000
PRISMA_SECRET=YourPrismaSecret
PRISMA_ENDPOINT=YourPrismaEndpoint
PRISMA_DEBUG=false
APP_SECRET=YourApplicationSecret
```

* `PORT`: The port on which this application will be run, default to `4000`.
* `PRISMA_SECRET`: This is your Prisma secret that you set previously on `database/prisma.yml`. See the [Create Prisma Service Configuration File](#create-prisma-service-configuration-file) section.
* `PRISMA_ENDPOINT`: This is your Prisma GraphQL API HTTP endpoint. See the [Deploy Your Prisma Service](#deploy-your-prisma-service) section.
* `PRISMA_DEBUG`: Indicates wheter you want to log queries and mutations to the console. Make sure to turn this off on production.
* `APP_SECRET`: This is the  secret that will be used to generate the JWTs to authenticate againsts your GraphQL API. Update it your own choice, it can be anything. It's different from `PRISMA_SECRET` which is used for Prisma GraphQL API.

### 6. Run the application 🎉

To run the application type the following command:

```shell
npm run start

# Or if you prefer to use Yarn
yarn start
```

Once it's started, visit the application with your browser (default address at [localhost:4000](http://localhost:4000)). You should see the GraphQL playground.

If you want your GraphQL API and your Prisma GraphQL API integrated on the same playground, type the following command:

```shell
$ graphql playground
```

The `graphql-cli` will open a new tab on your browser and direct you to [localhost:3000/playground](http://localhost:3000/playground).

## Query Examples

Here are some query examples that you can perform. You can always check the complete schema documentation on the playground.

### Get the Feed

```graphql
query {
  feed(
    first: 10
    skip: 0
    orderBy: createdAt_DESC
    search: "graphql"
  ) {
    count
    posts {
      id
      url
      description,
      postedBy {
        id,
        name
        email
      },
      createdAt
      votes {
        id
      }
    }
  }
}
```

The `feed` root accept four optionals arguments:

- `first`: Number of `posts` to retrieve
- `skip`: Number of `posts` to skip
- `orderBy`: How to order the `posts`
- `search`: Filter the `url` or `description` that matched the given search term

### Signing Up

To create a new account:

```graphql
mutation {
  signup(
    name: "John Doe"
    email: "test@example.com"
    password: "superSecret"
  ) {
    token,
    user {
      id
    }
  }
}
```

The `signup` mutation requires three arguments:

- `name`: The name of the user
- `email`: The email address of the user
- `password`: The password of the user

You can select the `token` to get the generated JWT token that can be used to authenticate this user.

### Logging In

Use the `login` mutation to get the JWT token for authenticating the user.

```graphql
mutation {
  login(
    email: "test@example.com"
    password: "superSecret"
  ) {
    token
    user {
      id
      name
      email
      posts {
        id
      }
    }
  }
}
```

### Create a New Post

To create a new post, you need provide a valid JWT token on the HTTP headers:

```json
{
    "Authorization": "Bearer UserJWTToken"
}
```

Check the [Logging In](#logging-in) section on how to retrieve the JWT token for user.

To create a new post, you can use the `createPost` mutation:

```graphql
mutation {
  createPost(
    url: "https://graphql.org"
    description: "A query language for your API"
  ) {
    id
    url
    description
    postedBy {
      id
      email
    }
    createdAt
  }
}
```

The `createPost` mutation requires two arguments:

- `url`: The URL for the post
- `description`: The description of the given URL

### Vote for a Post

Use the `vote` mutation to vote for a post. Just like the [Create a New Post](#create-a-new-post), you need to provide the JWT token on the HTTP headers.

```graphql
mutation {
  vote(postId: "abc123") {
    id
    user {
      name
      email
    }
    post {
      url
      description
    }
  }
}
```

### Subscribe to a New Post

You can subscribe to a new post with `newPost` subscription:

```graphql
subscription {
  newPost {
    mutation
    node {
      id
      url
      description
    }
  }
}
```

### Subscribe to a New Vote

You can subscribe to a new vote with `newVote` subscription:

```graphql
subscription {
  newVote {
    mutation
    node {
      user {
        name
      }
      post {
        url
        description
      }
    }
  }
}
```

> ⚠️ Issue with Subscription Filter
>
> Note that at the time when this project is created, there's still an issue with Prisma subscription filter: [github.com/graphcool/prisma/issues/1734](https://github.com/graphcool/prisma/issues/1734). Thus both the `newPost` and `newVote` subscriptions will receive the data for all kind of mutations: CREATED, UPDATED and DELETED.
>
> Once this issue is fixed, you should update the code at: [`src/resolvers/Subscription.js`](https://github.com/risan/hackernews-clone-server/blob/master/src/resolvers/Subscription.js).

## License

MIT © [Risan Bagja Pradana](https://risan.io)
