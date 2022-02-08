<template>
    <form>
        <button @click.prevent="deleteFiles">Удалить</button>
        <button @click.prevent="copyFiles">Скопировать</button>
        <button @click.prevent="moveFiles">Переместить</button>
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
        }
    }
}
</script>

<style lang="scss" scoped>
form {
    display: flex;
    gap: 1rem;
}
</style>