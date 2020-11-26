import Vue from 'vue'
import App from './App.vue'
import PrimeUI from './packages'
import './styles/index.scss'
Vue.config.productionTip = false
Vue.use(PrimeUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
