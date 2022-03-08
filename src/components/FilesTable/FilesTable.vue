<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Название</th>
        <th>Расширение</th>
        <th>Размер</th>
        <th>Дата изменения</th>
      </tr>
    </thead>
    <tbody>
      <back-arrow-row :disabled="disableBackArrow" />

      <tr v-if="!isPath" disabled class="info">
        <td>Выберете диск или введите путь</td>
      </tr>
      <tr v-else-if="!isFilesExists" disabled class="info">
        <td>В этой директории файлов нет</td>
      </tr>

      <template v-else>
        <file-data-row
          v-for="(file, idx) in folder.filesData"
          @select-file="selectFile($event, file)"
          :file="file"
          :isSelected="isSelectedFile(file)"
          :key="idx"
        />
      </template>
    </tbody>
  </table>
</template>

<script>
import FileDataRow from './FileDataRow.vue'
import BackArrowRow from './BackArrowRow.vue' 

export default {
  components: {
    FileDataRow,
    BackArrowRow
  },
  props: {
    folder: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },

    isPath: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      selectedFiles: [],
    };
  },

  computed: {
    isFilesExists() {
      return Boolean(this.folder.filesData.length);
    },

    disableBackArrow() {
      return this.folder.isRoot || !this.isPath
    }
  },

  methods: {
    open(file) {
      if (file.is_directory) {
        this.$emit("open-folder", file.path);
      } else if (file.is_file) {
        this.$emit("open-file", file.path);
      }
    },

    selectFile(event, file) {
      if (this.selectedFiles.includes(file)) {
        const idx = this.selectedFiles.indexOf(file);
        this.selectedFiles.splice(idx, 1);
      } else if (event.ctrlKey) {
        this.selectedFiles.push(file);
      } else {
        this.selectedFiles = [file];
      }
      this.$emit("select-files", this.selectedFiles);
    },

    isSelectedFile(file) {
      return Boolean(this.selectedFiles.includes(file))
    },

    back() {
      this.$emit("back");
    },
  },
};
</script>

<style lang="scss" scoped>

table {
  display: grid;
  grid-template-columns:
    minmax(30px, min-content) minmax(100px, 1fr) minmax(100px, min-content)
    minmax(100px, max-content) minmax(100px, max-content);

  th {
    text-align: start;
    border-left: 1px solid lightgray;
    padding-left: 3px;
  }

  tr {
    cursor: pointer;
  }
}

thead,
tbody,
tr {
  display: contents;
}

tr.info td {
  grid-column-start: 1;
  grid-column-end: 6;
}
</style>
