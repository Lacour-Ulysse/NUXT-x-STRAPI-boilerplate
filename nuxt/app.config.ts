export default defineAppConfig({
  ui: {
    primary: "default",
    gray: "zinc",
    icons: {
      dynamic: true,
    },
    notification: {
      wrapper: "absolute m-auto top-32 left-0 right-0 max-w-xl w-full",
      container: "",
      icon: { base: "self-center w-8 h-8" },
    },
  },
});
