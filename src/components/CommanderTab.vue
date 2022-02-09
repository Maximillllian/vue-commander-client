<template>
  <div class="tab">
    <header>
      <div class="content">
        <commander-tab-drives :drives="drives" @change-directory="loadFolder" />
        <path-bread-crumbs :path="formatedPath" @open-folder="loadFolder" />
        <search-path-input @search="loadFolder" :placeholder="drives[0].path" :error.sync="pathNotExist" />
      </div>
      <hr />
    </header>
    <main>
      <files-table
        :folder="folder"
        :is-path="isPath"
        @select-files="selectFiles"
        @back="backToParentFolder"
        @open-folder="changePath"
        @open-file="openFile"
      />
    </main>
    <footer>
      <control-panel
        @delete="handleDeleteFiles"
        @copy="handleCopyFiles"
        @move="handleMoveFiles"
      />
    </footer>
    <choose-path-popup ref="choosePathPopup" />
    <delete-confirmation-popup ref="deletePopup" />
  </div>
</template>

<script>
import {
  getFilesFromFolder,
  openFileNative,
  getParentFolderPath,
  getDrives,
  deleteFiles,
  copyFiles,
  moveFiles,
} from "../api";

import CommanderTabDrives from "./CommanderTabDrives.vue";
import FilesTable from "./FilesTable.vue";
import PathBreadCrumbs from "./PathBreadCrumbs.vue";
import ControlPanel from "./ControlPanel.vue";
import ChoosePathPopup from "./ChoosePathPopup.vue";
import DeleteConfirmationPopup from './DeleteConfirmationPopup.vue'
import SearchPathInput from './SearchPathInput.vue'

export default {
  components: {
    CommanderTabDrives,
    FilesTable,
    PathBreadCrumbs,
    ControlPanel,
    ChoosePathPopup,
    DeleteConfirmationPopup,
    SearchPathInput
  },

  data() {
    return {
      folder: [],
      path: "",
      selectedFiles: [],
      drives: [],
      pathNotExist: false,
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

    selectedFilesPaths() {
      return this.selectedFiles.flatMap((file) => file.path);
    },

    isSelectedFilesExist() {
      return Boolean(this.selectedFiles.length)
    }
  },

  methods: {
    changePath(path) {
      this.path = path;
    },

    selectFiles(files) {
      this.selectedFiles = files;
    },

    async loadFolder(path) {
      try {
        this.hideError();
        this.folder = await getFilesFromFolder(path);
        this.path = path;
      } catch (err) {
        this.pathNotExist = true;
        console.log(err);
      }
    },

    async reloadFolder() {
      this.folder = await getFilesFromFolder(this.path);
    },

    async openFile(path) {
      await openFileNative(path);
    },

    async backToParentFolder() {
      this.path = await getParentFolderPath(this.path);
    },

    async loadDrives() {
      this.drives = await getDrives();
    },

    hideError() {
      this.pathNotExist = false;
    },

    async openChoosePathPopup() {
      const popupResult = await this.$refs.choosePathPopup.open();
      return popupResult;
    },

    async openDeletePopup() {
      const popupResult = await this.$refs.deletePopup.open();
      return popupResult;
    },

    async handleDeleteFiles() {
      if (this.isSelectedFilesExist) {
        const deleteConfirmation = await this.openDeletePopup()
        if (deleteConfirmation) {
          await deleteFiles(this.selectedFilesPaths);
          this.reloadFolder();
          alert('Файлы успешно удалены :)')
        }
      } else {
        alert('Выберите файлы для удаления')
      }
    },

    async handleCopyFiles() {
      if (this.isSelectedFilesExist) {
        const destinationPath = await this.openChoosePathPopup();
        if (destinationPath) {
          try {
            await copyFiles(this.selectedFilesPaths, destinationPath);
            alert("Файлы успешно скопированы :)");
          } catch (err) {
            alert("Произошла ошибка при копировании!");
          }
        }
      } else {
        alert('Выберите файлы для копирования')
      }
    },

    async handleMoveFiles() {
      if (this.isSelectedFilesExist) {
        const destinationPath = await this.openChoosePathPopup();
        if (destinationPath) {
          try {
            await moveFiles(this.selectedFilesPaths, destinationPath);
            this.reloadFolder();
            alert("Файлы успешно перемещены :)");
          } catch (err) {
            alert("Произошла ошибка при перемещении!");
          }
        }
      } else {
        alert('Выберите файлы для перемещения')
      }
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

  @media screen and (max-width: 991.98px) {
    height: 100vh;
  }

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
    padding: 0.5rem 0;
  }
}
</style>
