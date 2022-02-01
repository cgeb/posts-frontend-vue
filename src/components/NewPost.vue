<template>
  <post-writer @save="save" :post="newPost" />
</template>

<script lang="ts">
import PostWriter from "./PostWriter.vue";
import { defineComponent } from "vue";
import { Post } from "@/mocks";
import moment from "moment";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NewPost",
  components: {
    PostWriter,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const userId = store.getState().users.currentUserId;

    if (!userId) {
      throw new Error("currentUserId was not found");
    }

    const newPost: Post = {
      id: "-1",
      title: "Enter your title here...",
      created: moment().subtract(1, "second"),
      userId,
    };

    const save = async (post: Post) => {
      await store.createPost(post);
      router.push("/");
    };

    return { newPost, save };
  },
});
</script>
