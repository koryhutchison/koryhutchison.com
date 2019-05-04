import Vue from 'vue'
import Navigation from './components/navigation'
import BrandContainer from './components/brand-container'

Vue.component('navigation', Navigation)
Vue.component('brandContainer', BrandContainer)

const main = new Vue({
  el: '#main'
})
