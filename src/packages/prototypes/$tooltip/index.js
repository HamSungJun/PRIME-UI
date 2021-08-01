import Vue from 'vue'
import PuiTooltip from './pui-tooltip.vue'
import PuiTooltipContainer from './pui-tooltip-container.vue'
import { PUI_DEFAULT_TOOLTIP_CONTAINER_ZINDEX, PUI_DEFAULT_MAX_ROTATE_ID } from '../../constants'

const PUI_DEFAULT_TOOLTIP_OPTIONS = Object.create(null)
Object.defineProperties(PUI_DEFAULT_TOOLTIP_OPTIONS, {
  theme: { value: '', writable: true, configurable: false, enumerable: true },
  distance: { value: 10, writable: true, configurable: false, enumerable: true },
  placement: { value: 'Top-Center', writable: true, configurable: false, enumerable: true },
  autoPlacement: { value: true, writable: true, configurable: false, enumerable: true },
  customStyle: { value: null, writable: true, configurable: false, enumerable: true },
  customClass: { value: '', writable: true, configurable: false, enumerable: true },
  showDelay: { value: 0, writable: true, configurable: false, enumerable: true },
  hideDelay: { value: 0, writable: true, configurable: false, enumerable: true },
  useStack: { value: false, writable: true, configurable: false, enumerable: true },
  useArrow: { value: false, writable: true, configurable: false, enumerable: true },
  useAnimation: { value: true, writable: true, configurable: false, enumerable: true },
  animationName: { value: 'fade', writable: true, configurable: false, enumerable: true },
  animationDuration: { value: 0.25, writable: true, configurable: false, enumerable: true },
  clickToClose: { value: true, writable: true, configurable: false, enumerable: true },
  resizeToClose: { value: true, writable: true, configurable: false, enumerable: true },
  scrollToClose: { value: true, writable: true, configurable: false, enumerable: true }
})

const PUI_TOOLTIP_BUS = new Vue()

const show = ({ source, textContent = '', tooltipOptions = {}, tooltipHandlers = {} } = {}) => {
  if (!source) return
  PUI_TOOLTIP_BUS.$emit('show', {
    source,
    textContent,
    tooltipOptions: setOption(tooltipOptions),
    tooltipHandlers
  })
}

const hide = ({ tooltipId }) => {
  if (typeof tooltipId !== 'number') return
  PUI_TOOLTIP_BUS.$emit('hide', { tooltipId })
}

const hideAll = () => {
  PUI_TOOLTIP_BUS.$emit('hide-all')
}

const setOption = (tooltipOptions = {}) => {
  //* 툴팁 생성 함수 호출시 입력된 옵션이 있다면 새로운 객체를 생성하여 오버라이드 후 반환.
  if (Object.keys(tooltipOptions).length === 0) return PUI_DEFAULT_TOOLTIP_OPTIONS
  const newOption = Object.assign(Object.create(null), PUI_DEFAULT_TOOLTIP_OPTIONS)
  for (const [optionKey, optionValue] of Object.entries(tooltipOptions)) {
    if (optionKey in PUI_DEFAULT_TOOLTIP_OPTIONS) {
      Object.defineProperty(newOption, optionKey, { value: optionValue })
    }
  }
  return newOption
}

export default {
  name: '$tooltip',
  install (Vue, options = {}) {
    //* 일회성의 기본 전역 옵션 설정하기.
    for (const [optionKey, optionValue] of Object.entries(options)) {
      if (optionKey in PUI_DEFAULT_TOOLTIP_OPTIONS) {
        PUI_DEFAULT_TOOLTIP_OPTIONS[optionKey] = optionValue
      }
    }
    Object.freeze(PUI_DEFAULT_TOOLTIP_OPTIONS)
    Vue.component('pui-tooltip', PuiTooltip)
    Vue.component('pui-tooltip-container', Object.assign({}, PuiTooltipContainer, {
      props: {
        zIndex: {
          type: Number,
          required: false,
          default: PUI_DEFAULT_TOOLTIP_CONTAINER_ZINDEX
        },
        defaultTooltipOptions: {
          type: Object,
          required: false,
          default: () => PUI_DEFAULT_TOOLTIP_OPTIONS
        },
        defaultMaxRotateId: {
          type: Number,
          required: false,
          default: PUI_DEFAULT_MAX_ROTATE_ID
        }
      }
    }))
    Vue.prototype.$tooltip = { show, hide, hideAll, PUI_TOOLTIP_BUS }
  }
}
