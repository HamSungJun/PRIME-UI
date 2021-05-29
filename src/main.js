import Vue from 'vue'
import App from './App.vue'
import PrimeUI from './packages'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCheck,
  faTrashAlt,
  faCaretDown,
  faPencilAlt,
  faPlusCircle,
  faGripVertical,
  faArrowCircleUp
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCheck,
  faTrashAlt,
  faCaretDown,
  faPencilAlt,
  faPlusCircle,
  faGripVertical,
  faArrowCircleUp
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(PrimeUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
