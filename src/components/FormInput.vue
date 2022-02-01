<template>
  <div class="field">
    <label class="label" :name="name">{{ name }}</label>
    <div class="control">
      <input
        :type="type"
        :id="name"
        class="input"
        :value="modelValue"
        @input="handleInput"
      />
    </div>
    <p class="is-danger help">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },

  setup(props, ctx) {
    const handleInput = (e: Event) => {
      ctx.emit("update:modelValue", (e.target as HTMLInputElement).value);
    };

    return { handleInput };
  },
});
</script>

/* eslint-enable vue/no-mutating-props */
