<template>
  <tr class="back" :disabled="disabled" @dblclick="back">
    <td><span class="material-icons-outlined"> arrow_back </span></td>
    <td class="message">Вернуться назад</td>
  </tr>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: false, 
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
$back-color: #c2e4c9;

tr.back {
  td {
    background-color: $back-color;
    display: flex;
    align-items: center;

    &.message {
      grid-column-start: 2;
      grid-column-end: 6;
    }
  }
}

tr.back[disabled] td {
  opacity: 0.3;
}
</style>