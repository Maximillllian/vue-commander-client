<template>
  <app-popup ref="popup">
    <template #title>Удаление файлов</template>
    <template #body>
      <div>Вы уверены, что хотите удалить выбранные файлы?</div>
    </template>
  </app-popup>
</template>

<script>
import AppPopup from "./AppPopup.vue";

export default {
  components: {
    AppPopup,
  },

  methods: {
    async open() {
      const res = await this.$refs.popup.open();
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
