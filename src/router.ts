import { createRouter, createWebHistory, Router } from "vue-router";
import EditPost from "./components/EditPost.vue";
import Home from "./components/Home.vue";
import NewPost from "./components/NewPost.vue";
import ShowPost from "./components/ShowPost.vue";
import { Store } from "./store";

export const routerWithStore = (store: Store): Router => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/posts/new",
        component: NewPost,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/posts/:id/edit",
        component: EditPost,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/posts/:id",
        component: ShowPost,
      },
      {
        path: "/",
        component: Home,
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    const auth = !!store.getState().users.currentUserId;

    if (!to.meta.requireAuth || (to.meta.requireAuth && auth)) {
      next();
    } else {
      next({
        path: "/",
      });
    }
  });

  return router;
};
