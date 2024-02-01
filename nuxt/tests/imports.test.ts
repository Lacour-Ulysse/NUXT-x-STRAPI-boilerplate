import { expect } from "vitest";

describe("import vue components", () => {
  test("regular import", async () => {
    const cmp = await import("~/components/HelloWorld.vue");
    expect(cmp).toBeDefined();
  });
  test("template string import", async () => {
    const cmp = await import(`../components/HelloWorld.vue`);
    expect(cmp).toBeDefined();
  });
  test("dynamic import", async () => {
    const name = "HelloWorld";
    const cmp = await import(`../components/${name}.vue`);
    expect(cmp).toBeDefined();
  });
});
