import Vue from 'vue'
import Navigation from './components/navigation'
import BrandContainer from './components/brand-container'
import KorySection from './components/kory-section'
import BlogGallery from './components/blog-gallery'

import VueHighlightJS from 'vue-highlight.js';
import vue from 'vue-highlight.js/lib/languages/vue';
import python from 'highlight.js/lib/languages/python'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import ruby from 'highlight.js/lib/languages/ruby'

import 'highlight.js/styles/github.css';

Vue.use(VueHighlightJS, {
    languages: {
        vue,
        python,
        javascript,
        bash,
        ruby
    }
})

Vue.component('navigation', Navigation)
Vue.component('brandContainer', BrandContainer)
Vue.component('korySection', KorySection)
Vue.component('blogGallery', BlogGallery)

const main = new Vue({
  el: '#main'
})
