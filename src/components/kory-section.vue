<template>
    <div class="padding">
        <div class="pad-sides" :class="blog ? 'blog-container': 'content-container'">
            <div v-if="title" class="text-center">
                <h1>{{ title }}</h1>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        blog: Boolean
    }
}
</script>

<style scoped>
.blog-container {
    max-width: 900px;
    margin: auto;
}

.content-container {
    max-width: 1070px;
    margin: auto;
}

.padding {
    padding-top: 60px;
    padding-bottom: 60px;
}
</style>
