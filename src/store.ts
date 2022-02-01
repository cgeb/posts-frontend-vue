import { reactive, readonly } from "@vue/reactivity";
import axios from "axios";
import { App, inject } from "vue";
import { Post } from "./mocks";

export const storeKey = Symbol("store");

export interface UserForm {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
}

export interface State {
  posts: PostsState;
  users: UsersState;
}

interface BaseState<T> {
  ids: string[];
  all: Map<string, T>;
  loaded: boolean;
}

type PostsState = BaseState<Post>;
interface UsersState extends BaseState<User> {
  currentUserId?: string;
}

export class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  install(app: App) {
    app.provide(storeKey, this);
  }

  getState() {
    return readonly(this.state);
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>("/posts");
    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      loaded: true,
    };

    for (const post of response.data) {
      postsState.ids.push(post.id);
      postsState.all.set(post.id, post);
    }

    this.state.posts = postsState;
  }

  async createPost(post: Post) {
    const response = await axios.post("/posts", post);
    this.state.posts.ids.push(response.data.id);
    this.state.posts.all.set(response.data.id, response.data);
  }

  async updatePost(post: Post) {
    const response = await axios.put("/posts", post);
    this.state.posts.all.set(response.data.id, response.data);
  }

  async createUser(userForm: UserForm) {
    const response = await axios.post("/users", userForm);
    this.state.users.ids.push(response.data.id);
    this.state.users.all.set(response.data.id, response.data);
    this.state.users.currentUserId = response.data.id;
  }
}

export const store = new Store({
  users: {
    ids: [],
    all: new Map<string, User>(),
    loaded: false,
  },
  posts: {
    ids: [],
    all: new Map<string, Post>(),
    loaded: false,
  },
});

export const useStore = (): Store => {
  const _store = inject<Store>(storeKey);
  if (!_store) {
    throw Error("Did you forget to call provide?");
  }

  return _store;
};
