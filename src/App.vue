<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button @click="hide" class="modal-close is-large"></button>
  </div>
  <section class="section">
    <div class="container">
      <navbar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";
import { useModal } from "./useModal";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const modal = useModal();

    const style = computed(() => {
      return {
        display: modal.show.value ? "block" : "none",
      };
    });

    return {
      style,
      hide: modal.hideModal,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style: revert;
  list-style-position: inside;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0;
}
</style>
