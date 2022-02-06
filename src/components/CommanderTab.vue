<template>
  <div class="tab">
    <commander-tab-drives @change-directory="changeDrive" />
    <files-table :files="files" @open-folder="addToPath" />
  </div>
</template>

<script>
import { getFilseFromFolder } from "../api";
import CommanderTabDrives from "./CommanderTabDrives.vue";
import FilesTable from './FilesTable.vue'

export default {
  components: {
    CommanderTabDrives,
    FilesTable
  },

  data() {
    return {
      files: [],
      path: "",
    };
  },

  watch: {
    path() {
      this.openFolder(this.path);
    },
  },

  methods: {
    changeDrive(files, path) {
      this.path = path;
      this.files = files;
    },

    addToPath(name) {
      console.log(name);
      this.path += `\\${name}`;
    },

    async openFolder(path) {
      this.files = await getFilseFromFolder(path);

    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  height: 100%;
  background: lightcoral;
}
</style>
