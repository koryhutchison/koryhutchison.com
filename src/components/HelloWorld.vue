<template>
    <div>
        <h1>Jekyll-Vue Template</h1>
        <button @click="test">Test</button>
    </div>
</template>

<script>
export default {
    methods: {
        test () {
            console.log('This is a test')
        }
    }
}
</script>

<style scoped>
h1 {
  color: darkslategrey;
  font-size: 2rem;
}
</style>
