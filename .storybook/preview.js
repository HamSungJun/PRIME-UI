import Vue from 'vue';
// import '../src/styles/index.scss';
import PrimeUI from '../src/packages'
Vue.use(PrimeUI);
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