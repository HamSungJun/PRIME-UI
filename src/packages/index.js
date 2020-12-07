import Components from './components'
import Prototypes from './prototypes'
// const Directives = [
//
// ]

export default {
  install (Vue) {
    Components.forEach(component => { Vue.component(component.name, component) })
    Prototypes.forEach(prototype => { Vue.prototype[prototype.name] = prototype })
    // Directives.forEach(directive => { Vue.directive(directive.name, directive) })
  }
}
