import Vue from 'vue'
import Navigation from './components/navigation'
import BrandContainer from './components/brand-container'
import KorySection from './components/kory-section'
import BlogGallery from './components/blog-gallery'

import VueHighlightJS from 'vue-highlight.js';
import 'vue-highlight.js/lib/allLanguages'

import 'highlight.js/styles/github.css';

Vue.use(VueHighlightJS)

Vue.component('navigation', Navigation)
Vue.component('brandContainer', BrandContainer)
Vue.component('korySection', KorySection)
Vue.component('blogGallery', BlogGallery)

const main = new Vue({
  el: '#main'
})
