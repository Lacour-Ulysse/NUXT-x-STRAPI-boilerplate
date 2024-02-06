# Nuxt 3 starter

Ressources :

- **[Nuxt x Graphql tutorial](https://selemondev.hashnode.dev/powering-your-nuxt-3-app-with-graphql-using-nuxt-apollo)**

- **[Script setup cheatsheet](https://fadamakis.com/vue-3-script-setup-cheat-sheet-36572c042128)**

### `Pinia`

**[Documentation](https://pinia.vuejs.org/ssr/nuxt.html)**

### `Nuxt UI` :

Comes with tailwind, color-mode and nuxt-icon librairy.

- [Nuxt UI](https://ui.nuxt.com/getting-started)
- [Tailwind](https://tailwindcomponents.com/cheatsheet/)
- [Icons](https://icon-sets.iconify.design/)

### `VueUse` : [HERE](https://vueuse.org/)

Helper functions and Composables.

### `nuxtjs/strapi` : [HERE](https://vueuse.org/)

Used only for authentication for now. All drafts content types can be seen if connected.

### `Vitest`

To test the application we use vitest : **[Documentation](https://vitest.dev/guide/)**

```bash
yarn test

yarn coverage
```

Tests are also run via github actions.

### `Sentry`

**[Tutorial](https://gearboxgo.com/articles/web-application-development/setting-up-sentry-with-nuxt-3)**

To set up Sentry on Nuxt, create dedicated project on [sentry.io](https://sentry.io/) then run :

```bash
npx @sentry/wizard@latest -i sourcemaps
```

Choose Vite as bundler, grab the auth token for git secrets and remove the auto created vite.config.js.

<br/>
<br/>

<details>
<summary>BASIC YARN COMMANDS</summary>
<br/>

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

</details>
