import Vue from 'vue'
import PuiToast from './pui-toast.vue'

const TOAST_DIRECTIONS = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right'
]

const Toast = Vue.extend(PuiToast)
function ToastController () {
  this.toasts = new Map()
  this.toastOptions = {
    top: 5,
    left: 5,
    width: '50%',
    type: 'success',
    lifeTime: 200000,
    distance: 5,
    direction: 'top-left'
  }
  this.directionState = {}
  TOAST_DIRECTIONS.forEach(direction => { this.directionState[direction] = 0 })
  Object.preventExtensions(this.directionState)
  Object.preventExtensions(this.toastOptions)
}

ToastController.prototype.createToasts = function (toastProps) {
  toastProps.forEach(toastProp => {
    const props = Object.assign({}, this.toastOptions, toastProp)
    const toastInstance = new Toast({
      propsData: {
        controllerRef: this,
        toastProps: props
      }
    })
    /* 다이나믹 프로퍼티가 적용된 토스트 템플릿을 인스턴스화 시킵니다. */
    toastInstance.$mount()
    /* body 엘리먼트의 직계자손으로 추가하면서 layout이 계산됩니다. */
    document.body.appendChild(toastInstance.$el)
    /* 새로운 토스트의 가시성을 전환하기 전에 기존 같은 방향의 토스트들이 남아있다면 공간 확보를 위해 먼저 이동시킨후 전환합니다. */
    const sameDirectionToasts = this.getSameDirectionToasts(props.direction)
    if (sameDirectionToasts.length > 0) {
      this.moveToasts(sameDirectionToasts, toastInstance.getScrollHeight())
    }
    this.toasts.set(toastInstance._uid, toastInstance)
    setTimeout(toastInstance.startLife, 250)
  })
}

ToastController.prototype.moveToasts = function (toasts, diff) {
  toasts.forEach(toast => { toast.move(diff) })
}

ToastController.prototype.getSameDirectionToasts = function (direction) {
  return [...this.toasts.values()].filter(toast => toast.toastProps.direction === direction)
}

ToastController.prototype.updateDirectionState = function (direction, diff) {
  this.directionState[direction] += diff
}

ToastController.prototype.deleteToast = function (toastUid) {
  if (this.toasts.has(toastUid)) {
    this.toasts.delete(toastUid)
  }
}

ToastController.prototype.deleteToastAll = function () {
  const toastIterator = this.toasts.keys()
  let nextToast = null
  while ((nextToast = toastIterator.next()).done === false) {
    this.deleteToast(nextToast.value)
  }
}

export default new ToastController()
