<template>
  <div>
      <div class="drives">
          <button v-for="drive in drives" :key="drive.path" @click="openFolder(drive.path)">{{ drive.path }}</button>
      </div>
  </div>
</template>

<script>
import { getDrives, getFilseFromFolder } from "../api";

export default {
  data() {
    return {
      drives: {},
    };
  },

  created() {
    this.loadDrives();
  },

  methods: {
    async loadDrives() {
      this.drives = await getDrives();
    },

    async openFolder(path) {
        const files = await getFilseFromFolder(path)
        this.$emit('change-directory', files, path)
    }
  },
};
</script>

<style lang="scss" scoped>
.drives {
    display: flex;
    gap: 1rem;
}
</style>