<template>
    <div>
        <span v-if="type === 'folder'" class="material-icons"> folder </span>
        <span v-else class="material-icons"> description </span>
    </div>
</template>

<script>
export default {
    props: {
        type: String
    }
}
</script>