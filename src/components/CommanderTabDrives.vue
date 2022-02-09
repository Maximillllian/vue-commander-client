<template>
    <div class="drives">
      Диски:
      <select name="" v-model="selectedDrive">
        <option v-for="drive in drives" :key="drive.path" :value="drive">{{ drive.path }}</option>
      </select>
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

  watch: {
    selectedDrive() {
      this.changeDrive(this.selectedDrive.path)
    }
  },

  data() {
    return {
      selectedDrive: null
    }
  },

  created() {
    this.selectedDrive = this.drives[0]
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
