<template>
  <app-popup ref="popup">
    <template #title><slot name="title"></slot></template>
    <template #body>
      <form>
        <div class="form-item">
          <label for="path">Введите путь:</label>
          <input v-model="path" type="text" name="path" id="path" :placeholder="placeholder"/>
        </div>
      </form>
      <div v-if="showError" class="error">Пожалуйста, введите путь</div>
    </template>
    <template #footer="{ confirm, cancel }">
      <div class="controls">
        <button @click="handleConfirmation(confirm)">Ок</button>
        <button @click="cancel">Отмена</button>
      </div>
    </template>
  </app-popup>
</template>

<script>
import AppPopup from "./AppPopup.vue";

export default {
  components: {
    AppPopup,
  },

  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },

  data() {
      return {
          showError: false,
          path: ''
      }
  },

  computed: {
    formattedPath() {
      return this.path.replace(/\\|\\\\|\//gi, "\\");
    },
  },

  methods: {
    handleConfirmation(confirmFn) {
      if (this.path) {
        confirmFn(this.formattedPath)
      } else {
        this.showError = true;
      }
    },

    async open() {
      const res = await this.$refs.popup.open();
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-item {
  display: flex;
  gap: .5rem;
}
</style>
