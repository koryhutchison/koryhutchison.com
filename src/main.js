import Vue from 'vue'
import Navigation from './components/navigation'
import BrandContainer from './components/brand-container'
import KorySection from './components/kory-section'
import BlogGallery from './components/blog-gallery'

Vue.component('navigation', Navigation)
Vue.component('brandContainer', BrandContainer)
Vue.component('korySection', KorySection)
Vue.component('blogGallery', BlogGallery)

const main = new Vue({
  el: '#main'
})
