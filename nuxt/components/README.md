# COMPONENTS

The components directory contains your Vue.js Components.

More information about the usage of this directory in :

- [the offical documentation](https://nuxt.com/docs/guide/directory-structure/components#components-directory).

- [this super well documented article](https://fadamakis.com/the-anatomy-of-a-vue-3-component-285eadadea89).

- [those beginners errors to watch out](https://fadamakis.com/10-mistakes-to-avoid-when-starting-with-vue-3-1d1ced8552ae)

- [and this cheat sheet](https://fadamakis.com/vue-3-script-setup-cheat-sheet-36572c042128)

In _nuxt.config.ts_ components is configured with :

```ts
components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
```

So the import name of components is only the name if the file, not following path/directory structure.
