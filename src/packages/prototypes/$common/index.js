import {
  PUI_DEFAULT_THROTTLE_FREQUENCY,
  PUI_DEFAULT_DEBOUNCE_DURATION
} from '../../constants'

export default {
  name: '$common',

  /**
   * wrapThrottle: 특정 함수를 빠른 주기로 실행하더라도 정해진 주기내에서 실행하도록 하는 클로저 팩토리 함수.
   * @param {Function} fn
   * @param {Number} frequency
   */

  wrapThrottle (fn, frequency = PUI_DEFAULT_THROTTLE_FREQUENCY) {
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
  },

  /**
   * wrapDebounce: 특정 함수를 빠른 주기로 실행하더라도 특정 시간내의 호출은 무시하고 마지막의 호출을 실행하도록 하는 클로저 팩토리 함수.
   * @param {Function} fn
   * @param {Number} duration
   */

  wrapDebounce (fn, duration = PUI_DEFAULT_DEBOUNCE_DURATION) {
    let timerId = null
    return (...args) => {
      if (timerId) clearTimeout(timerId)
      timerId = setTimeout(() => {
        fn(...args)
        timerId = null
      }, duration)
    }
  }
}
