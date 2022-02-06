<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Имя файла</th>
        <th>Расширение</th>
        <th>Размер</th>
        <th>Дата изменения</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="file in files"
        :key="file.name"
        @dblclick="openFolder(file.name)"
      >
        <td><file-icon :type="file.type" /></td>
        <td>{{ file.name }}</td>
        <td>
            <template v-if="file.is_directory">&lt;ПАПКА&gt;</template>
            <template v-if="file.is_file">{{ file.extension }}</template>
        </td>
        <td>{{ file.size }}</td>
        <td>{{ file.last_modified }}</td>
      </tr>
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
    files: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },

  methods: {
    openFolder(name) {
      this.$emit("open-folder", name);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}
</style>
