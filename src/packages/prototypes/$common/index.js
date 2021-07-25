import {
  PUI_DEFAULT_THROTTLE_FREQUENCY,
  PUI_DEFAULT_DEBOUNCE_OPTION_DURATION,
  PUI_DEFAULT_DEBOUNCE_OPTION_INITIAL
} from '../../constants'
import { placeAt } from './placer'
/**
 * wrapThrottle: 특정 함수를 빠른 주기로 실행하더라도 정해진 주기내에서 실행하도록 하는 클로저 팩토리 함수.
 * @param {Function} fn
 * @param {Number} frequency
 */
export function wrapThrottle (fn, frequency = PUI_DEFAULT_THROTTLE_FREQUENCY) {
  const freq = (1000 / frequency)
  let timerId = null
  return (...args) => {
    if (timerId) return
    timerId = setTimeout(() => {
      fn(...args)
      clearTimeout(timerId)
      timerId = null
    }, freq)
  }
}

/**
 * wrapDebounce: 특정 함수를 빠른 주기로 실행하더라도 특정 시간내의 호출은 무시하고 마지막의 호출을 실행하도록 하는 클로저 팩토리 함수.
 * @param {Function} fn
 * @param {Number} duration
 */
export function wrapDebounce (fn, { duration = PUI_DEFAULT_DEBOUNCE_OPTION_DURATION, initial = PUI_DEFAULT_DEBOUNCE_OPTION_INITIAL } = {}) {
  let timerId = null
  let isInitial = initial
  return (...args) => {
    if (isInitial) {
      fn(...args)
      isInitial = false
      return
    }
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
      isInitial = initial
    }, duration)
  }
}

export default {
  name: '$common',
  install (Vue, options = {}) {
    Vue.prototype.$common = { wrapThrottle, wrapDebounce, placeAt }
  }
}
