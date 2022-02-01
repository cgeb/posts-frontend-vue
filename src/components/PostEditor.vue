<template>
  <post-writer @save="save" :post="post" />
</template>

<script lang="ts">
import { Post } from "@/mocks";
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostWriter from "./PostWriter.vue";

export default defineComponent({
  components: { PostWriter },
  async setup() {
    const store = useStore();
    const router = useRouter();
    const id = useRoute().params.id as string;

    if (!store.getState().posts.loaded) {
      await store.fetchPosts();
    }

    const post = store.getState().posts.all.get(id);

    if (!post) {
      throw new Error("Post was not found");
    }

    if (post.userId !== store.getState().users.currentUserId) {
      router.push("/");
    }

    const save = async (post: Post) => {
      await store.updatePost(post);
      router.push("/");
    };

    return { post, save };
  },
});
</script>

<style scoped></style>
