import { Post, today } from "../../src/mocks";
import { State, Store } from "../../src/store";

const mockPost: Post = {
  ...today,
};

jest.mock("axios", () => ({
  get: () => {
    return {
      data: [mockPost],
    };
  },
}));

describe("store/fetchPosts", () => {
  it("fetches post and updates state", async () => {
    const store = new Store({
      posts: {
        ids: [],
        all: new Map(),
        loaded: true,
      },
      users: {
        ids: [],
        all: new Map(),
        loaded: false,
      },
    });

    await store.fetchPosts();

    const expected: State = {
      posts: {
        ids: [mockPost.id],
        all: new Map([[mockPost.id, mockPost]]),
        loaded: true,
      },
      users: {
        ids: [],
        all: new Map(),
        loaded: false,
      },
    };

    expect(store.getState()).toEqual(expected);
  });
});
