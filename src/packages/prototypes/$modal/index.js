import Vue from 'vue'
import PuiModal from './pui-modal.vue'
import PuiModalContainer from './pui-modal-container.vue'

const PUI_DEFAULT_MODAL_OPTIONS = Object.create(null)
Object.defineProperties(PUI_DEFAULT_MODAL_OPTIONS, {
  useStack: { value: false, enumerable: true, writable: false, configurable: false },
  clickToClose: { value: true, enumerable: true, writable: false, configurable: false },
  escapeToClose: { value: true, enumerable: true, writable: false, configurable: false }
})

const PUI_MODAL_BUS = new Vue()

function show ({ modalComp, modalProps = {}, modalOptions = {}, modalHandlers = {} } = {}) {
  modalOptions = setOption(modalOptions)
  PUI_MODAL_BUS.$emit('show', {
    modalComp,
    modalProps,
    modalOptions,
    modalHandlers
  })
}

function close (modalId) {
  PUI_MODAL_BUS.$emit('close', modalId)
}

function closeAll () {
  PUI_MODAL_BUS.$emit('close-all')
}

function setOption (modalOptions) {
  const nextOption = {}
  for (const key in PUI_DEFAULT_MODAL_OPTIONS) {
    nextOption[key] = key in modalOptions ? modalOptions[key] : PUI_DEFAULT_MODAL_OPTIONS[key]
  }
  return nextOption
}

export default {
  name: '$modal',
  install (Vue, options = {}) {
    Vue.component('pui-modal', PuiModal)
    Vue.component('pui-modal-container', Object.assign({}, PuiModalContainer, {
      props: {
        modalOptions: {
          type: Object,
          default: () => setOption(options)
        }
      }
    }))
    Vue.prototype.$modal = { show, close, closeAll, PUI_MODAL_BUS }
  }
}
