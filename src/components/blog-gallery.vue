<template>
    <div class="gallery-wrapper">
        <div class="filter-panel">
            <div class="filter-dialog" :style="stickSearch ? 'position: fixed; top: 50px' : ''">
                <div class="text-center">
                    <h3 class="search-headding">Narrow your search</h3>
                    <input class="search-field" type="text" v-model="search" placeholder="Search" />
                </div>
                <div>
                    <h3 class="category-headding">By category:</h3>
                    <div class="category" v-for="(category, index) in categories">
                        <label class="switch">
                            <input v-model="category.active" type="checkbox">
                            <span class="slider"></span>
                        </label>
                        {{ category.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="posts-panel text-center">
            <a v-for="post in filteredPosts" class="post-thumbnail-link" :href="post.url">
                <div class="post-thumbnail">
                    <div class="post-image" :style="`background: url('${post.image}') no-repeat center/130%`"></div>
                    <div class="pad-sides">
                        <h2>{{ post.title }}</h2>
                        {{ post.excerpt }}
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            categories: [],
            posts: [],
            search: '',
            stickSearch: false
        }
    },
    computed: {
        filteredPosts () {
            const result = this.posts.filter(post => {
                let count = 0
                return ((post.title.toLowerCase().indexOf(this.search) > -1)
                        && (post.categories.some(category => {
                            let activeCount = 0
                            this.categories.forEach(cat => {
                                count += cat.name === category && cat.active ? 1 : 0;
                                activeCount += cat.active ? 1 : 0;
                            });
                            return count == activeCount
                        })));
            });

            return result;
        }
    },
    methods: {
        handleScroll () {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                this.stickSearch = true;
            } else {
                this.stickSearch = false;
            }
        }
    },
    mounted () {
        axios.get('/_data/categories.json')
             .then(response => {
                 response.data.forEach(category => {
                     this.categories.push({
                         name: category,
                         active: false
                     });
                 });
             });

        axios.get('/_data/posts.json')
             .then(response => {
                 this.posts = response.data;
             });
    },
    created () {
        document.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        document.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style scoped>
.category {
    margin: 7px;
    display: flex;
    align-items: center;
    font-size: 18px;
}
.category-headding {
    margin-bottom: 10px;
}
.filter-dialog {
    position: relative;
    margin: 15px 10px 10px 30px;
    border-radius: 10px;
    background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
    color: #FFF;
    padding: 20px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, .4);
}
.filter-panel {
    width: 300px;
}
.gallery-wrapper {
    width: 100%;
    display: flex;
}
.posts-panel {
    flex-grow: 2;
    flex-basis: 0;
}
.search-field {
    padding: 10px;
    border-radius: 5px;
    border: none;
    transition: transform .3s ease 0s, box-shadow .3s ease 0s;
}
.search-field:focus {
    transform: translateY(-3px);
    box-shadow: 0 2px 7px rgba(0, 0, 0, .4);
}
.search-headding {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 25px;
}

/* Post Styling */
.post-image {
    height: 200px;
    width: 100%;
    background-color: grey;
    border-radius: 10px 10px 0px 0px;
}

.post-thumbnail {
    display: inline-block;
    width: 300px;
    height: 350px;
    border-radius: 10px;
    margin: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .3);
    transition: all .5s ease 0s;
}

.post-thumbnail:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, .3);
}

.post-thumbnail-link {
    text-decoration: none;
    color: inherit;

}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  margin-right: 10px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34px;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .4);
}
.slider:before {
  position: absolute;
  content: "";
  height: 21px;
  width: 21px;
  left: 3px;
  bottom: 2px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #00cc00;
}
input:focus + .slider {
  box-shadow: 0 0 1px #00cc00;
}
input:checked + .slider:before {
  transform: translateX(23px);
}
</style>
