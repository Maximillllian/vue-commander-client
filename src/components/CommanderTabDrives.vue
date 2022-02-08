<template>
    <div class="drives">
      Диски:
      <button
        v-for="drive in drives"
        :key="drive.path"
        @click="changeDrive(drive.path)"
      >
        {{ drive.path }}
      </button>
    </div>
</template>

<script>
export default {
  props: {
      drives: {
          type: Array,
          default() {
              return []
          }
      }
  },

  methods: {
    async changeDrive(path) {
      this.$emit("change-directory", path);
    },
  },
};
</script>

<style lang="scss" scoped>
.drives {
  display: flex;
  align-items: center;
  gap: 1rem;
//   padding: .5rem;
}
</style>
