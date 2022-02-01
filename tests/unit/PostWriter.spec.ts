import PostWriter from "@/components/PostWriter.vue";
import { mount } from "@vue/test-utils";
import moment from "moment";

describe("PostWriter.vue", () => {
  it("emits a save event with the new post", async (done) => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          id: "1",
          title: "New title",
          created: moment(),
          userId: "1",
        },
      },
    });

    await wrapper.find("[data-test='title']").setValue("My new title");

    const content = wrapper.find<HTMLDivElement>("[data-test='content']");
    content.element.innerText = "## New content";
    await content.trigger("input");

    setTimeout(async () => {
      await wrapper.find("[data-test='submit']").trigger("click");

      const emitted = (wrapper.emitted()["save"] as any)[0][0];

      expect(emitted.title).toEqual("My new title");
      expect(emitted.markdown).toEqual("## New content");
      expect(emitted.html).toEqual('<h2 id="new-content">New content</h2>\n');
      done();
    }, 300);
  });
});
