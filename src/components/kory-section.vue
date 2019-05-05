<template>
    <div class="padding">
        <div class="content-container pad-sides">
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
        title: String
    }
}
</script>

<style scoped>
.content-container {
    max-width: 1070px;
    margin: auto;
}

.padding {
    padding-top: 60px;
    padding-bottom: 60px;
}
</style>
