import Vue from 'vue'
import Navigation from './components/navigation'
import BrandContainer from './components/brand-container'
import KorySection from './components/kory-section'

Vue.component('navigation', Navigation)
Vue.component('brandContainer', BrandContainer)
Vue.component('korySection', KorySection)

const main = new Vue({
  el: '#main'
})
