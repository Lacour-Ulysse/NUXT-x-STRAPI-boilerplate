// imports
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

// import component to test
import SinglePost from "~/components/Blocks/SinglePost.vue";

const title = "Test Title";

describe("SinglePost", () => {
  it("renders title", () => {
    const wrapper = mount(SinglePost, {
      props: {
        attributes: {
          title,
        },
      },
    });

    expect(wrapper.find("h1").text()).toContain("Test Title");
  });

  it("renders description", () => {
    const wrapper = mount(SinglePost, {
      props: {
        attributes: {
          title,
          description: "Test Description",
        },
      },
    });

    expect(wrapper.findComponent({ name: "Richtext" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "Richtext" }).props("richText")).toBe(
      "Test Description"
    );
  });
});
