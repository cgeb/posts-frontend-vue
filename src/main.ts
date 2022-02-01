import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import { Post, thisMonth, thisWeek, today } from "./mocks";
import { routerWithStore } from "./router";
import random from "lodash/random";
import "highlight.js/styles/foundation.css";
import { store, User } from "./store";

const delay = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};

// @ts-ignore
axios.get = async (url: string) => {
  if (url === "/posts") {
    await delay();
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  }
};

// @ts-ignore
axios.post = async (url: string, payload: any) => {
  if (url === "/posts") {
    const id = random(100, 10000);
    await delay();
    const post: Post = {
      ...payload,
      id: id.toString(),
    };
    return Promise.resolve<{ data: Post }>({
      data: post,
    });
  }

  if (url === "/users") {
    const id = random(100, 10000);
    await delay();
    const user: User = {
      id: id.toString(),
      username: payload.username,
    };
    return Promise.resolve<{ data: User }>({
      data: user,
    });
  }
};

// @ts-ignore
axios.put = async (url: string, payload: any) => {
  if (url === "/posts") {
    await delay();
    const post: Post = {
      ...payload,
    };
    return Promise.resolve<{ data: Post }>({
      data: post,
    });
  }
};

const app = createApp(App);
app.use(routerWithStore(store));
app.use(store);

app.mount("#app");
