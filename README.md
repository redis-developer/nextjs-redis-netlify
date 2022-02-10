# Next.js + TailwindCSS + Redis + Netlify Serverless Starter

![nextjs-tailwind-redis-netlify-serverless](https://user-images.githubusercontent.com/785258/153513467-68934da0-ad2a-4d4b-b72b-327b8865102a.png)

This is a [Next.js](https://nextjs.org/) v12 project with [TailwindCSS](https://tailwindcss.com/) and [Redis](https://developer.redis.com/) using [Redis OM](https://github.com/redis/redis-om-node), ready to be instantly deployed to [Netlify](https://url.netlify.com/SyTBPVamO)!

This project is a very minimal starter that includes 3 sample components, a global stylesheet, a `netlify.toml` for deployment, a `jsconfig.json` for setting up absolute imports and aliases, and `postcss.config.js` and `tailwind.config.js` files for configuring Tailwind. It also includes the [Essential Next.js Build Plugin](https://github.com/netlify/netlify-plugin-nextjs), which will allow for you to implement features like Preview Mode, server-side rendering/incremental static regeneration via Netlify Functions, and internationalized routing.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/redis-developer/nextjs-redis-netlify)

(If you click this button, it will create a new repo for you that looks exactly like this one, and sets that repo up immediately for deployment on Netlify)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Installation options

**Option one:** One-click deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-netlify-starter&utm_source=github&utm_medium=nextstarter-cs&utm_campaign=devex-cs)

**Option two:** Manual clone

1. Clone this repo: `git clone https://github.com/netlify-templates/next-netlify-starter.git`
2. Navigate to the directory and run `npm install`
3. Run `npm run dev`
4. Make your changes
5. Connect to [Netlify](https://url.netlify.com/Bk4UicocL) manually (the `netlify.toml` file is the one you'll need to make sure stays intact to make sure the export is done and pointed to the right stuff)

### Environment variables

You will find a `.env.example` file in the root of the project. Copy it to `.env.local` and fill in the value for your Redis connection string. When you deploy, you will also need to configure your environment variables for your Netlify environnment.

> **Note:** If you are using a localhost Redis this app is configured to connect to "redis://localhost:6379" by default

## Setting up indexes

This app uses [Redis OM](https://github.com/redis/redis-om-node), which will automatically setup indexes for you in Redis. In the `server/redis.js` you will find a commented-out line:

```js
await repository.createIndex();
```

When you first start the app, you will need to create the index by uncommenting this line and searching. After that point you can comment this line again and the index will be maintained.

## About the app

The app is a very basic Redis cache app. It allows you to see the performance increase you can achieve when you use Redis as a cache. It does this using the GitHub API. You can search for repositories, and it will first check Redis to see if the repository is already in the cache. If it is, it will return the cached data. If not, it will fetch the data from GitHub and store it in Redis. It also tracks the performance of both operations and shows it to you.

### How the data is stored

Redis OM is used to store the data on your behalf. While you do not need to worry about the specific commands used to store the data, the following commands are used:

- **FT.CREATE**: Used to create indexes for RediSearch
- **HSET**: Used to set a hash of the GitHub repository data

### How the data is accessed

Redis OM is used to fetch the data on your behalf. While you do not need to worry about the specific commands used to fetch the data, the following commands are used:

- **FT.SEARCH**: Used to search for existing repositories in the cache