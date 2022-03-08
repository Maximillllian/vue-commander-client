<template>
  <tr
    :class="{ selected: isSelected }"
    :key="file.name"
    @dblclick="open(file)"
    @click="selectFile($event)"
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

<script>
import FileIcon from "./FileIcon.vue";

export default {
  components: {
    FileIcon,
  },

  props: {
    file: {
      type: Object,
      required: true,
      default() {
        return {
          name: String(),
          type: String(),
          is_directory: Boolean(),
          is_file: Boolean(),
          size: Number(),
          last_modified: Date(),
        };
      },
    },

    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    selectFile(event) {
        this.$emit('select-file', event, this.file)
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors";

tr[disabled] td {
  pointer-events: none;
  cursor: default;
}

tr {
  &:hover td {
    background-color: $light-blue;
  }

  &.selected td {
    background-color: $blue;
  }
}

tr th,
tr td > span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 5px;
}

tr td {
  display: flex;
  align-items: center;
}
</style>
