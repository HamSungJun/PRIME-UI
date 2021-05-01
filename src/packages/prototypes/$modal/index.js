import Vue from 'vue'
import PuiModal from './pui-modal.vue'
import PuiModalContainer from './pui-modal-container.vue'
Vue.component('pui-modal', PuiModal)
Vue.component('pui-modal-container', PuiModalContainer)

const PUI_DEFAULT_MODAL_OPTIONS = Object.create(null)
Object.defineProperties(PUI_DEFAULT_MODAL_OPTIONS, {
  useStack: { value: false },
  clickToClose: { value: false },
  clickToEscape: { value: false }
})
Object.freeze(PUI_DEFAULT_MODAL_OPTIONS)

const PUI_MODAL_BUS = new Vue()

function show ({ modalComp, modalProps = {}, modalOptions = {}, modalHandlers = {} } = {}) {
  console.dir(modalComp)
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

}

export default {
  name: '$modal',
  show,
  close,
  closeAll,
  modalBus: PUI_MODAL_BUS
}
