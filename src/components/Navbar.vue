<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="auth" class="buttons">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button @click="signOut" class="button">Sign Out</button>
      </div>
      <div v-else class="buttons">
        <button @click="signUp" class="button" data-test="sign-up">
          Sign Up
        </button>
        <button @click="signIn" class="button">Sign In</button>
      </div>
    </div>
  </div>

  <teleport to="#modal">
    <component :is="component" />
  </teleport>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { useModal } from "@/useModal";
import { computed, defineComponent, markRaw } from "vue";
import Signup from "./Signup.vue";

export default defineComponent({
  name: "Navbar",
  components: { Signup },
  setup() {
    const modal = useModal();
    const store = useStore();

    const auth = computed(() => {
      return !!store.getState().users.currentUserId;
    });

    const signIn = () => {
      console.log("signin");
    };
    const signUp = () => {
      console.log("signUp");
      modal.component.value = markRaw(Signup);
      modal.showModal();
    };
    const signOut = () => {
      console.log("signin");
    };

    return { auth, signIn, signUp, signOut, component: modal.component };
  },
});
</script>
