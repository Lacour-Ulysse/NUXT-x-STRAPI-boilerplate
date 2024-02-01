// Add bearer token to query
// https://docs.strapi.io/dev-docs/plugins/graphql#api-tokens

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const strapiToken = runtimeConfig.public.STRAPI_TOKEN;

  nuxtApp.hook(
    // @ts-ignore
    "apollo:auth",
    ({ client, token }: { client: any; token: any }) => {
      // apply apollo client token
      token.value = strapiToken;
    }
  );
});
