import Vue from 'vue'
import PuiPopover from './pui-popover.vue'
import PuiPopoverContainer from './pui-popover-container.vue'
import { PUI_DEFAULT_POPOVER_CONTAINER_ZINDEX, PUI_DEFAULT_MAX_ROTATE_ID } from '../../constants'

const PUI_DEFAULT_POPOVER_OPTIONS = Object.create(null)
Object.defineProperties(PUI_DEFAULT_POPOVER_OPTIONS, {
  top: { value: 0, writable: true, configurable: false, enumerable: true },
  left: { value: 0, writable: true, configurable: false, enumerable: true },
  distance: { value: 20, writable: true, configurable: false, enumerable: true },
  placement: { value: 'Top-Center', writable: true, configurable: false, enumerable: true },
  autoPlacement: { value: true, writable: true, configurable: false, enumerable: true },
  useArrow: { value: false, writable: true, configurable: false, enumerable: true },
  useAnimation: { value: true, writable: true, configurable: false, enumerable: true },
  animationName: { value: 'fade', writable: true, configurable: false, enumerable: true },
  animationDuration: { value: 0.25, writable: true, configurable: false, enumerable: true },
  useStack: { value: false, writable: true, configurable: false, enumerable: true },
  mountAt: { value: null, writable: true, configurable: false, enumerable: true },
  clickToClose: { value: true, writable: true, configurable: false, enumerable: true },
  resizeToClose: { value: true, writable: true, configurable: false, enumerable: true },
  scrollToClose: { value: true, writable: true, configurable: false, enumerable: true },
  responsive: { value: false, writable: true, configurable: false, enumerable: true }
})

const PUI_POPOVER_BUS = new Vue()

const open = ({ source, popoverComp, popoverProps = {}, popoverOptions = {}, popoverHandlers = {} } = {}) => {
  if (!popoverComp || !source) return
  PUI_POPOVER_BUS.$emit('open', {
    source,
    popoverComp,
    popoverProps,
    popoverOptions: setOption(popoverOptions),
    popoverHandlers
  })
}

const close = ({ popoverId }) => {
  if (typeof popoverId !== 'number') return
  PUI_POPOVER_BUS.$emit('close', { popoverId })
}

const closeAll = () => {
  PUI_POPOVER_BUS.$emit('close-all')
}

const setOption = (popoverOptions = {}) => {
  //* 팝오버 생성 함수 호출시 입력된 옵션이 있다면 새로운 객체를 생성하여 오버라이드 후 반환.
  if (Object.keys(popoverOptions).length === 0) return PUI_DEFAULT_POPOVER_OPTIONS
  const newOption = Object.assign(Object.create(null), PUI_DEFAULT_POPOVER_OPTIONS)
  for (const [optionKey, optionValue] of Object.entries(popoverOptions)) {
    if (optionKey in PUI_DEFAULT_POPOVER_OPTIONS) {
      Object.defineProperty(newOption, optionKey, { value: optionValue })
    }
  }
  return newOption
}

export default {
  name: '$popover',
  install (Vue, options = {}) {
    //* 일회성의 기본 전역 옵션 설정하기.
    for (const [optionKey, optionValue] of Object.entries(options)) {
      if (optionKey in PUI_DEFAULT_POPOVER_OPTIONS) {
        PUI_DEFAULT_POPOVER_OPTIONS[optionKey] = optionValue
      }
    }
    Object.freeze(PUI_DEFAULT_POPOVER_OPTIONS)
    Vue.component('pui-popover', PuiPopover)
    Vue.component('pui-popover-container', Object.assign({}, PuiPopoverContainer, {
      props: {
        zIndex: {
          type: Number,
          required: false,
          default: PUI_DEFAULT_POPOVER_CONTAINER_ZINDEX
        },
        defaultPopoverOptions: {
          type: Object,
          required: false,
          default: () => PUI_DEFAULT_POPOVER_OPTIONS
        },
        defaultMaxRotateId: {
          type: Number,
          required: false,
          default: PUI_DEFAULT_MAX_ROTATE_ID
        }
      }
    }))
    Vue.prototype.$popover = { open, close, closeAll, PUI_POPOVER_BUS }
  }
}
