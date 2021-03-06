import NewPost from "@/components/NewPost.vue";
import { Store } from "@/store";
import { mount } from "@vue/test-utils";

let routes: string[] = [];

jest.mock("vue-router", () => ({
  useRouter: () => {
    return {
      push: (route: string) => {
        routes.push(route);
      },
    };
  },
}));

jest.mock("axios", () => ({
  post: (url: string, payload: any) => {
    return {
      data: payload,
    };
  },
}));

describe("NewPost.vue", () => {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
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
      loaded: true,
      currentUserId: "10000",
    },
  });

  beforeEach(() => {
    routes = [];
  });

  it("creates a post and redirects to /", async () => {
    const wrapper = mount(NewPost, {
      global: {
        plugins: [store],
      },
    });

    expect(store.getState().posts.ids).toHaveLength(0);

    await wrapper.find("[data-test='submit']").trigger("click");

    expect(store.getState().posts.ids).toHaveLength(1);

    expect(routes).toEqual(["/"]);
  });
});
