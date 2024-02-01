# Nuxt x Strapi boilerplate

<p float="middle">
    <img src="https://img.shields.io/badge/nuxt%20js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/strapi-2F2E8B?style=for-the-badge&logo=strapi&logoColor=white" />
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white" />
</p>

<br/>
<br/>

**THIS PROJECT IS UNDER HEAVY DEVELOPMENT**

Any help or advice is really welcome !

This boilerplate is using Nuxt 3 as frontend and Strapi as backend, Postgres as database, Graphql and Typescript. The whole app is dockerized and ready to run.

A few utils script are included (auto types export from Strapi to Nuxt, data migration), a nginx config file [example](./nginx.example), two docker compose files one for [dev](./docker-compose.dev.yml) and another for [production](./docker-compose.prod.yml) and a bash script to set up local dev server.

<br/>
<br/>

## Dedicated readme

### [NUXT README.md](nuxt/README.md)

### [STRAPI README.md](strapi/README.md)

<br/>
<br/>

## Docker commands

### `Dev` :

Install dependencies locally and creates docker containers.

```bash
bash dev-server.sh
```

<br/>

### `Prod` :

```bash
docker compose -f docker-compose.prod.yml up --build
```

Or (to run container in background) :

```bash
sudo docker compose -f docker-compose.prod.yml up --build -d
```

<br/>
<br/>

## Github actions

`Actions secrets` :

You'll have a few secrets to add to your github repository for actions to work.

_For releases :_

`SENTRY_ORG`, `SENTRY_PROJECT_NUXT`, `SENTRY_PROJECT_STRAPI`, `SENTRY_AUTH_TOKEN_NUXT`, `SENTRY_AUTH_TOKEN_STRAPI`

_For Deploy :_

See [tutorial](https://www.programonaut.com/how-to-deploy-a-git-repository-to-a-server-using-github-actions/) and create a PAT on github with repo & workflow scopes.

`PAT`, `PROD_BRANCH`, `STAGING_BRANCH`, `SSH_PRIVATE_KEY`, `SSH_USER`, `SSH_HOST`, `WORK_DIR`

### `tests` :

On push to dev branch and on closed merged pull request to main, all the tests (vitest) for nuxt app are run. If they fail no other githbub action will be triggered.

➡ [Github action](.github/workflows/tests.yml)

### `deploy`:

If tests are successfull when merging on main branch the repository will be pulled on server, and docker container will be rebuild with updated app.
Inspired by this [tutorial](https://www.programonaut.com/how-to-deploy-a-git-repository-to-a-server-using-github-actions/)

➡ [Github action](.github/workflows/deploy.yml)

### `release` :

If deployement was run successfully a github & sentry release is generated.
Any commit message that includes #major, #minor, #patch, or #none will trigger the respective version bump. If two or more are present, the highest-ranking one will take precedence.
Based on this [video](https://www.youtube.com/watch?v=vAGHl0t9x1U).

➡ [Github action](.github/workflows/release.yml)

<br/>
<br/>

## First upload to production :

I'm using a server with a locale nginx installation, you'll only nginx and docker installed localy. Then you can upload the app with the following commands :

From the folder where the app will be located on your server :

```bash
git clone https://$PAT@github.com/GIT_USERNAME/REPOSITORY_NAME.git
```

To set up Personal Access Token (PAT), create it ([documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)) and then :

```bash
nano ~/.bashrc
```

Add to bashrc file :

> export PAT="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"

Quit and save. Restart terminal and check with :

```bash
echo $PAT
```

Create .env file based on .env.prod.

Build apps/containers with :

```bash
sudo docker compose -f docker-compose.prod.yml up --build -d
```

Get containers id with :

```bash
docker ps -a
```

And get IP adresses of containers with :

```bash
docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" IP_ADRESS
```

Create two nginx config files for both frontend and backend, example config file [here](./nginx.example).

And of course set up your domains on your provider.

Check dedicated readme for [nuxt](nuxt/README.md) and [strapi](strapi/README.md) to know further upload to production steps.

<br/>
<br/>

<p>
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
    <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />
    <img src="https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white" />
</p>
