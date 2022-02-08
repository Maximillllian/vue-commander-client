<template>
  <div class="tab">
    <header>
      <div class="content">
        <commander-tab-drives
          :drives="drives"
          @change-directory="loadFolder"
        />
        <path-bread-crumbs :path="formatedPath" @open-folder="loadFolder"/>
        <form class="path-input-form">
          <label for="path-input">Введите путь: </label>
          <input @input="hideError" v-model="inputPath" type="text" name="path-input" id="path-input" :placeholder="drives[0].path">
          <button @click.prevent="loadFolder(inputPath)">Перейти</button>
        </form>
        <div class="error" :hidden="!pathNotExist">Такого пути нет</div>
      </div>
      <hr />
    </header>
    <main>
      <files-table
        :folder="folder"
        :is-path="isPath"
        @back="backToParentFolder"
        @open-folder="addToPath"
        @open-file="openFile"
      />
    </main>
    <footer>
      <control-panel />
    </footer>
  </div>
</template>

<script>
import {
  getFilseFromFolder,
  openFileNative,
  getParentFolderPath,
  getDrives,
} from "../api";

import CommanderTabDrives from "./CommanderTabDrives.vue";
import FilesTable from "./FilesTable.vue";
import PathBreadCrumbs from './PathBreadCrumbs.vue'
import ControlPanel from './ControlPanel.vue'

export default {
  components: {
    CommanderTabDrives,
    FilesTable,
    PathBreadCrumbs,
    ControlPanel
  },

  data() {
    return {
      folder: [],
      path: "",
      inputPath: '',
      drives: [],
      pathNotExist: false
    };
  },

  async mounted() {
    this.loadDrives();
  },

  watch: {
    path() {
      this.loadFolder(this.path);
    },
  },

  computed: {
    formatedPath() {
      return this.path.replace("\\\\", "\\");
    },

    isPath() {
      return Boolean(this.path);
    },
  },

  methods: {
    changePath(path) {
      this.path = path;
    },

    addToPath(name) {
      this.path += `\\${name}`;
    },

    async loadFolder(path) {
      try {
        this.hideError()
        this.folder = await getFilseFromFolder(path);
        this.path = path
      } catch (err) {
        this.pathNotExist = true
        console.log(err)
      }
    },

    async openFile(name) {
      await openFileNative(`${this.path}\\${name}`);
    },

    async backToParentFolder() {
      this.path = await getParentFolderPath(this.path);
    },

    async loadDrives() {
      this.drives = await getDrives();
    },

    hideError() {
      this.pathNotExist = false
    }
  },
};
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr minmax(min-content, max-content);
  border: 1px solid lightgray;
  padding: 0.5rem;
  overflow-y: hidden;

  header {
    align-self: flex-start;
    padding: 0.5rem;

    .content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  main {
    overflow-y: scroll;
  }

  footer {
    align-self: flex-end;
  }
}

.path-input-form {
  display: flex;
  gap: .5rem;
  align-items: center;
}

.error {
  padding: .5rem;
  border: 1px solid red;
  background-color: rgb(240, 150, 150);
  color: rgb(182, 6, 6);
}
</style>
