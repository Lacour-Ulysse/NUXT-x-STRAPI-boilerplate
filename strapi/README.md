# Strapi

## Initial set up

Mount the whole app from root folder:

```bash
docker compose -f docker-compose.dev.yml up --build
```

At `http://localhost:1337/admin` create admin user and connect.

Then inside strapi container terminal import minimal/default data/settings :

```bash
yarn init-data

OR

# Prod command
sudo docker exec container_ID yarn init-data
```

Create API token : `Settings -> Global Settings -> API Tokens -> Create new API token`

Copy paste new token to Nuxt env variable STRAPI_TOKEN and reload containers.

**You're all set !**

# Plugins and utils infos :

## Import/export config & data

Inside strapi container :

```bash
yarn strapi import -f filename --force
```

If you need to export data, from local filesystem :

```bash
bash export-data.sh
```

Inside docker terminal :

```bash
yarn strapi export --no-encrypt --file filename
```

## Import/export content

**[Plugin](https://github.com/Baboo7/strapi-plugin-import-export-entries)**

Thanks to the plugin you can import/export entries more easly from Content Manager and dedicated plugins tab `Import Export`.

IDs of items must match because uniqueness of title and slug fields makes using id field as unique identifier mandatory.

## Strapi GraphQL

**[Tutorial](https://strapi.io/blog/a-deep-dive-into-strapi-graph-ql)**
**[Plugin](https://docs.strapi.io/dev-docs/plugins/graphql)**

## Apollo Sandbox

**[Github](https://github.com/creazy231/strapi-plugin-apollo-sandbox)**
**[Plugin](https://market.strapi.io/plugins/@creazy231-strapi-plugin-apollo-sandbox)**

## Strapi Keys

**[Github](https://github.com/ululab/strapi-keys)**

Generate/Refresh app keys (in .env) with :

```bash
yarn run strapi-keys --refresh
yarn run strapi-keys --generate
```

## Sitemap

**[Github](https://github.com/boazpoolman/strapi-plugin-sitemap)**

```bash
yarn add strapi-plugin-sitemap

# Rebuild admin UI to show sitemap in settings
yarn build
```

Then you can add pages to sitemap from Strapi settings.

## Sentry

**[Strapi module](https://market.strapi.io/plugins/@strapi-plugin-sentry)**
**[Strapi documentation](https://docs.strapi.io/dev-docs/plugins/sentry)**

Create a dedicated project for it in [sentry.io](https://sentry.io/) and a token you'll add to .env and github actions.

Planned errors (for duplicate) are sent with "ignore_error" tag set to true so it doesn't trigger an email notification thanks to this function :

```typescript
const cleanError = async (message: string) => {
  let error = new ApplicationError(message);
  strapi
    .plugin("sentry")
    .service("sentry")
    .sendError(error, (scope) => {
      scope.setTag("ignore_error", "true");
    });
  throw error;
};
```

## Local image sharp (for working srcset/sizes)

**[Documentation](https://strapi-community.github.io/strapi-plugin-local-image-sharp/guide/)**
**[Help](https://github.com/nuxt/image/issues/641#issuecomment-1674159933)**

```bash
yarn add strapi-plugin-local-image-sharp
```

**Inside Nuxt project :**

`nuxt.config.ts` :

```ts
  image: {
    providers: {
      localImageSharp: {
        provider: "@/providers/localImageSharp",
        options: {
          baseURL: `${process.env.STRAPI_SITE_URL}/uploads/`,
        },
      },
    },
    provider: "localImageSharp",
  },
```

Create `providers/localImageSharp.ts` :

```ts
import { joinURL } from "ufo";
import type { ProviderGetImage } from "@nuxt/image-edge";
import { createOperationsGenerator } from "#image";

export const getImage: ProviderGetImage = (
  src,
  { modifiers, baseURL = `${process.env.STRAPI_SITE_URL}/uploads` } = {}
) => {
  const operationsGenerator = createOperationsGenerator({
    keyMap: {
      width: "width",
      height: "height",
      resize: "resize",
      fit: "fit",
      position: "position",
      trim: "trim",
      format: "format",
      quality: "quality",
      rotate: "rotate",
      enlarge: "enlarge",
      flip: "flip",
      flop: "flop",
      sharpen: "sharpen",
      median: "median",
      gamma: "gamma",
      negate: "negate",
      normalize: "normalize",
      threshold: "threshold",
      grayscale: "grayscale",
      animated: "animated",
    },
    joinWith: ",",
    formatter: (key: string, value: string) => `${key}_${value}`,
  });

  const operations = operationsGenerator(modifiers);
  const url = joinURL(baseURL, operations, src);

  return { url };
};
```

## Automatic types from GraphQL schema

- [Github](https://github.com/dotansimha/graphql-code-generator)

Installs dependencies :

```bash
yarn add graphql

yarn add -D @graphql-codegen/cli

yarn add -D @graphql-codegen/typescript
```

On root of strapi folder create codegen.yml :

```yml
overwrite: true
schema: "http://localhost:1337/graphql"
generates:
  ./src/Strapi.d.ts:
    plugins:
      - "typescript"
```

And, inside root folder, to create/update types run :

```bash
bash auto-types.sh
```

<details>
<summary>BASIC YARN COMMANDS</summary>
<br/>

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```bash
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```bash
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```bash
yarn build
```

</details>

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.
