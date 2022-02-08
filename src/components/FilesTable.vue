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
      <tr class="back" :disabled="folder.isRoot || !isPath" @dblclick="back">
        <td><span class="material-icons-outlined"> arrow_back </span></td>
        <td class="message">Вернуться назад</td>
      </tr>
      <tr v-if="!isPath" disabled class="info">
        <td>Выберете диск или введите путь</td>
      </tr>
      <tr v-else-if="!isFilesExists" disabled class="info">
        <td>В этой директории файлов нет</td>
      </tr>

      <template v-else>
        <tr
          :class="{ selected: selectedFiles.includes(file) }"
          v-for="file in folder.filesData"
          :key="file.name"
          @dblclick="openFolder(file)"
          @click="selectFile($event, file)"
        >
          <td><file-icon :type="file.type" /></td>
          <td>
            <span>{{ file.name }}</span>
          </td>
          <td>
            <span>
              {{ file.extension }}
            </span>
          </td>
          <td>
            <span>
              <template v-if="file.is_directory">&lt;ПАПКА&gt;</template>
              <template v-if="file.is_file">{{ formatBytes(file.size) }}</template>
            </span>
          </td>
          <td>
            <span>{{ formatDate(file.last_modified) }}</span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import FileIcon from "./FileIcon.vue";

export default {
  components: {
    FileIcon,
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
  },

  methods: {
    openFolder(file) {
      if (file.is_directory) {
        this.$emit("open-folder", file.name);
      } else if (file.is_file) {
        this.$emit("open-file", file.name);
      }
    },

    formatDate(date) {
      const formatedDate = new Date(date).toLocaleString("RU-ru");
      if (formatedDate === "Invalid Date") {
        return "Нет данных";
      }
      return formatedDate;
    },

    formatBytes(bytes, decimals = 2) {
      if (!bytes) return "0 байт";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["байт", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },

    selectFile(event, file) {
      if (event.ctrlKey) {
        this.selectedFiles.push(file)
      } else {
        this.selectedFiles = [file];
      }
    },

    back() {
      this.$emit("back");
    },
  },
};
</script>

<style lang="scss" scoped>
$dark-blue: #9bb4cf;
$blue: #cee8eb;
$light-blue: #daefef;
$back-color: #c2e4c9;

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

    &:hover td {
      background-color: $dark-blue;
    }

    &.selected td {
      background-color: $dark-blue;
    }
  }
}

thead,
tbody,
tr {
  display: contents;
}

tr th,
tr td > span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 5px;
}

tr td {
  background-color: $blue;
  display: flex;
  align-items: center;
}

tr:nth-child(odd) td {
  background-color: $light-blue;
}

tr.info td {
  grid-column-start: 1;
  grid-column-end: 6;
}

tr.back {
  td {
    background-color: $back-color;

    &.message {
      grid-column-start: 2;
      grid-column-end: 6;
    }
  }
}

tr.back[disabled] td {
  opacity: 0.3;
}

tr[disabled] td {
  pointer-events: none;
  cursor: default;
}
</style>
