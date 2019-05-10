<template>
    <div>
        <h1 v-for="cat in categories">{{ cat }}</h1>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            categories: [],
            posts: []
        }
    },
    mounted () {
        axios.get('/_data/categories.json')
             .then(response => {
                 this.categories = response.data;
             });

        axios.get('/_data/posts.json')
             .then(response => {
                 this.posts = response.data;
             });
    }
}
</script>

<style scoped>

</style>
