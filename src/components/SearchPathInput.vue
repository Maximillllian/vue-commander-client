<template>
  <div>
    <form class="path-input-form">
      <label for="path-input">Введите путь: </label>
      <input
        @input="hideError"
        v-model="path"
        type="text"
        name="path-input"
        id="path-input"
        :placeholder="placeholder"
      />
      <button @click.prevent="search(path)">Перейти</button>
    </form>
    <div class="error" v-if="error">Такого пути нет</div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "\\",
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      path: "",
    };
  },

  methods: {
    hideError() {
      this.$emit("update:error", false);
    },

    search(path) {
      this.$emit("search", path);
    },
  },
};
</script>

<style lang="scss" scoped>
.path-input-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}
</style>
