<template>
  <app-popup ref="popup">
    <template #title>Выберите, куда переместить/скопировать файлы</template>
    <template #body>
      <form>
        <div class="form-item">
          <label for="path">Введите путь:</label>
          <input v-model="path" type="text" name="path" id="path" />
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
    action: {
      type: String,
      required: false,
      default: "copy",
    },
  },

  data() {
      return {
          showError: false
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

</style>
