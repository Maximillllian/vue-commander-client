<template>
    <form>
        <button @click.prevent="deleteFiles">Удалить</button>
        <button @click.prevent="copyFiles">Скопировать</button>
        <button @click.prevent="moveFiles">Переместить</button>
        <button @click.prevent="renameFile">Переименовать</button>
    </form>
</template>

<script>
export default {
    methods: {
        deleteFiles() {
            this.$emit('delete')
        },

        copyFiles() {
            this.$emit('copy')
        },

        moveFiles() {
            this.$emit('move')
        },

        renameFile() {
            this.$emit('rename')
        }
    }
}
</script>

<style lang="scss" scoped>
form {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}
</style>