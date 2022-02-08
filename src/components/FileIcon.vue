<template>
    <div>
        <span v-if="type === $options.TYPES.folder.name" class="material-icons"> {{$options.TYPES.folder.icon}} </span>
        <span v-else-if="type === $options.TYPES.audio.name" class="material-icons-outlined"> {{ $options.TYPES.audio.icon }} </span>
        <span v-else-if="type === $options.TYPES.image.name" class="material-icons-outlined"> {{ $options.TYPES.image.icon }} </span>
        <span v-else-if="type === $options.TYPES.video.name" class="material-icons-outlined"> {{ $options.TYPES.video.icon }} </span>
        <span v-else-if="type === $options.TYPES.text.name" class="material-icons-outlined"> {{ $options.TYPES.text.icon }} </span>
        <span v-else class="material-icons"> {{ $options.TYPES.file.icon }} </span>
    </div>
</template>

<script>
export default {
    props: {
        type: String
    },

    TYPES: {
        audio: {name: "audio", icon: "audiotrack"},
        image: {name: "image", icon: "image"},
        video: {name: "video", icon: "movie"},
        text: {name: "text", icon: "text_fields"},
        folder: {name: "folder", icon: "folder"},
        file: {name: "file", icon: "description"}
    }
}
</script>