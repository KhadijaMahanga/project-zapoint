# Jiko Point

Jiko Point ni jukwaa maalum na la kipekee la mtandaoni linalomilikiwa na kampuni ya Nukta Africa na kuwezeshwa na Shirika la Hivos na washirika wake kwa lengo la kuchochea matumizi ya nishati safi Tanzania. Ina vipengele vitatu ambavyo ni Jiko Class, Jiko News na Jiko Sokoni. 

Accessible at [https://jikopoint.co.tz](https://jikopoint.co.tz)

Built with love ❤️ using [Nextjs](https://github.com/vercel/next.js/), Javascript and a couple other helper libraries (see [package.json](./package.json)).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started with Jiko Point

### Local Development

### Environment Variables & Setup

Run the following to get started locally:

```sh
  # copy environment variable template to a file name .env
  cp .env.template .env
  # Edit the .env file
  yarn
  yarn dev
```

From the root folder, run `yarn` to install all dependencies, alternatively you can run `npm install`

```bash
$ yarn
```

### Running the app

```bash
# watch mode
$ yarn dev

# building
$ yarn build

# running compiled
$ yarn start
```

### Useful Scripts

In the project directory, you can run:

#### `yarn start` or `yarn dev` (for watch mode)

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api](http://localhost:3000/api/). This endpoint can be edited in `pages/api`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### `yarn lint`

Executes lint and tries to fix all fixable lint errors

#### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles Server in production mode and optimizes the build for the best performance.

See the next [build](https://nextjs.org/docs/api-reference/cli#build) documentation for more details.

#### `yarn storybook`

Starts a sandbox to view all resusable components developed in the aplication. Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

### Project Structure

```
.
├── LICENCE
├── README.md
├── jsconfig.json
├── next-seo.config.js
├── next.config.js
├── package.json
├── public
│   ├── favicon.ico
│   ├── fonts
│   └── styles
├── src
│   ├── assets
│   ├── components
│   ├── functions
│   ├── lib
│   ├── pages
│   ├── theme
│   └── utils
└── yarn.lock
```
