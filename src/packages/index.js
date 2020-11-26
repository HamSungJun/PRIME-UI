import PuiButton from './pui-button/pui-button'

const Components = [
  PuiButton
]

// const Prototypes = [
//
// ]
//
// const Directives = [
//
// ]

export default {
  install (Vue) {
    Components.forEach(component => { Vue.component(component.name, component) })
    // Prototypes.forEach(prototype => { Vue.prototype[prototype.name] = prototype })
    // Directives.forEach(directive => { Vue.directive(directive.name, directive) })
  }
}
