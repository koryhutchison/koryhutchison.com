<template>
    <nav id="nav" :class="isScrolling ? 'nav-scroll': ''">
        <div>
            <a v-for="n in navData" :href="n.link" v-text="n.name"></a>
        </div>
    </nav>
</template>

<script>
import NavData from '../data/navigation.js'
export default {
    data () {
        return {
            navData: new NavData().getData(),
            isScrolling: false
        }
    },
    methods: {
        handleScroll () {
            if (document.body.scrollTop > 0) {
                this.isScrolling = true;
            } else {
                this.isScrolling = false;
            }
        }
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
nav {
    width: 100%;
    height: 50px;
    position: fixed;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

nav div a {
    text-decoration: none;
    color: #FFF;
    margin-left: 20px;
    margin-right: 20px;
    transition: all .5s ease 0s;
}

nav div a:hover {
    color: #e6e6e6;
}

#nav {
    transition: all .5s ease 0s;
}

.nav-scroll {
    background-color: white;
    box-shadow: 0 5px 5px rgba(0, 0, 0, .1);
}

.nav-scroll a {
    color: rgba(0,0,0,.87);
}

.nav-scroll a:hover {
    color: rgba(0,0,0,.6);
}
</style>
