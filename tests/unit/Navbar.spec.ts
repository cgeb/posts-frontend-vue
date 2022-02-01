import Navbar from "@/components/Navbar.vue";
import Signup from "@/components/Signup.vue";
import { Store } from "@/store";
import { mount } from "@vue/test-utils";

describe("Navbar", () => {
  it("shows a signup modal via teleport", async () => {
    const store = new Store({
      posts: {
        all: new Map(),
        ids: [],
        loaded: false,
      },
      users: {
        ids: [],
        all: new Map(),
        loaded: false,
      },
    });

    const el = document.createElement("div");
    el.id = "modal";
    document.body.appendChild(el);

    const wrapper = mount(Navbar, {
      attachTo: document.body,
      global: {
        components: {
          RouterLink: {
            template: `<div></div>`,
          },
        },
        plugins: [store],
      },
    });

    await wrapper.get("[data-test='sign-up']").trigger("click");

    const form = wrapper.getComponent(Signup);

    expect(document.body.outerHTML).toContain("This value is required");

    await form.get("#Username").setValue("Username");
    await form.get("#Password").setValue("12345678910");

    expect(document.body.outerHTML).not.toContain("This value is required");

    await form.trigger("submit.prevent");
  });
});
