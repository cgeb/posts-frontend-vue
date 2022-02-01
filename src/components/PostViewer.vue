<template>
  <div class="columns">
    <div class="column" />
    <div class="column is-two-thirds">
      <router-link
        v-if="canEdit"
        :to="`/posts/${post.id}/edit`"
        class="button is-link is-rounded"
        data-test="can-edit"
        >Edit</router-link
      >
      <div>{{ post.title }}</div>
      <div v-html="post.html" />
    </div>
    <div class="column" />
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  async setup() {
    const store = useStore();
    const router = useRouter();
    const id = useRoute().params.id as string;

    if (!store.getState().posts.loaded) {
      await store.fetchPosts();
    }

    const post = store.getState().posts.all.get(id);

    if (!post) {
      router.push("/");
      return;
    }

    const canEdit = post.userId === store.getState().users.currentUserId;

    return { post, canEdit };
  },
});
</script>

<style scoped></style>
