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
          <input v-model="inputPath" type="text" name="path-input" id="path-input" :placeholder="drives[0].path">
          <button @click.prevent="loadFolder(inputPath)">Перейти</button>
        </form>
      </div>
      <div class="error" :hidden="!pathNotExist">Такого пути нет</div>
      <hr />
    </header>
    <main>
      <files-table
        :files="files"
        :root="isRoot"
        :is-path="isPath"
        @back="backToParentFolder"
        @open-folder="addToPath"
        @open-file="openFile"
      />
    </main>
    <footer>
      <p>Блабла</p>
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

export default {
  components: {
    CommanderTabDrives,
    FilesTable,
    PathBreadCrumbs
  },

  data() {
    return {
      files: [],
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

    isRoot() {
      if (!this.path) {
        return true;
      }
      const pathSectionsLength = this.formatedPath
        .split("\\")
        .filter(Boolean).length;
      if (this.formatedPath.startsWith("\\")) {
        return pathSectionsLength === 0;
      }
      return pathSectionsLength === 1;
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
        this.pathNotExist = false
        this.files = await getFilseFromFolder(path);
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
  color: red;
}
</style>
