<template>
  <form @submit.prevent="submit">
    <form-input
      v-model="username"
      name="Username"
      type="text"
      :error="usernameStatus.message"
    />

    <form-input
      v-model="password"
      name="Password"
      type="password"
      :error="passwordStatus.message"
    />

    <button
      class="button is-primary"
      :disabled="!usernameStatus.valid || !passwordStatus.valid"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import FormInput from "./FormInput.vue";
import { length, required, Status, validate } from "../validation";
import { UserForm, useStore } from "@/store";
import { useModal } from "@/useModal";

export default defineComponent({
  name: "Signup",
  components: {
    FormInput,
  },
  setup() {
    const username = ref("");
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [
        required(),
        length({ min: 5, max: 10 }),
      ]);
    });

    const password = ref("");
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [
        required(),
        length({ min: 10, max: 20 }),
      ]);
    });

    const store = useStore();
    const modal = useModal();

    const submit = async () => {
      if (!usernameStatus.value.valid || !passwordStatus.value.valid) {
        return;
      }

      const newUser: UserForm = {
        username: username.value,
        password: password.value,
      };

      await store.createUser(newUser);
      modal.hideModal();
    };

    return {
      username,
      usernameStatus,
      password,
      passwordStatus,
      submit,
    };
  },
});
</script>

<style scoped>
form {
  padding: 15px;
  background: white;
}
</style>
