// Existing imports
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

// Import component to test
import StrapiPage from "~/components/Blocks/StrapiPage.vue";

describe("StrapiPage", () => {
  it("renders title from props", () => {
    const title = "Test Title";
    const wrapper = mount(StrapiPage, {
      props: {
        strapiPage: {
          attributes: {
            title,
          },
        },
      },
    });

    expect(wrapper.text()).toContain(title);
  });
});
