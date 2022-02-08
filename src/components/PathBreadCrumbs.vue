<template>
  <div class="path-wrapper">
    <div>Теукщий путь:</div>
    <div class="path">
      <span v-for="(pathChunck, idx) in splitedPathArray" :key="idx" @click="openCrumbFolder(idx)">
        {{ pathChunck }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      reqiured: true,
      default: "",
    },
  },

  computed: {
    splitedPathArray() {
      return this.path.split(/(?<=\\)/g);
    },
  },

  methods: {
    openCrumbFolder(idx) {
      const slicedPath = this.splitedPathArray.slice(0, idx+1).join('')
      this.$emit('open-folder', slicedPath)
    }
  }
};
</script>

<style lang="scss" scoped>
.path-wrapper {
  display: flex;
  gap: 0.5rem;

  .path {
    display: flex;

    span {
      color: blue;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: lightskyblue;
      }
    }
  }
}
</style>
