import ShowPost from "@/components/ShowPost.vue";
import { today } from "@/mocks";
import { routerWithStore } from "@/router";
import { Store } from "@/store";
import { flushPromises, mount } from "@vue/test-utils";

describe("ShowPost", () => {
  it("does not show edit button when not authenticated", async () => {
    const store = new Store({
      posts: {
        ids: [today.id],
        all: new Map([[today.id, today]]),
        loaded: true,
      },
      users: {
        ids: [],
        all: new Map(),
        loaded: true,
      },
    });

    const router = routerWithStore(store);
    router.push(`/posts/${today.id}`);
    await router.isReady();

    const wrapper = mount(ShowPost, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();

    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false);
  });

  it("does not show edit button when not authorized", async () => {
    const store = new Store({
      posts: {
        ids: [today.id],
        all: new Map([[today.id, today]]),
        loaded: true,
      },
      users: {
        ids: ["10000"],
        all: new Map([
          [
            "10000",
            {
              username: "username",
              id: "10000",
            },
          ],
        ]),
        loaded: false,
        currentUserId: "10000",
      },
    });

    const router = routerWithStore(store);
    router.push(`/posts/${today.id}`);
    await router.isReady();

    const wrapper = mount(ShowPost, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();

    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(false);
  });

  it("show edit button when authorized", async () => {
    const store = new Store({
      posts: {
        ids: [today.id],
        all: new Map([[today.id, today]]),
        loaded: true,
      },
      users: {
        ids: [today.userId],
        all: new Map([
          [
            today.userId,
            {
              username: "username",
              id: today.userId,
            },
          ],
        ]),
        loaded: false,
        currentUserId: today.userId,
      },
    });

    const router = routerWithStore(store);
    router.push(`/posts/${today.id}`);
    await router.isReady();

    const wrapper = mount(ShowPost, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();

    expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(true);
  });
});
