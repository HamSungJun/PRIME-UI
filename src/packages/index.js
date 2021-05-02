import Components from './components'
import Prototypes from './prototypes'
// const Directives = [
//
// ]

export default {
  install (Vue, options = {}) {
    Components.forEach(component => {
      Vue.component(component.name, component)
    })
    Prototypes.forEach(prototype => {
      Vue.use(prototype, options[prototype.name] || {})
    })
    // Directives.forEach(directive => { Vue.directive(directive.name, directive) })
  }
}
