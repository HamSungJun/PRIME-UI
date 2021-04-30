import Vue from 'vue'
import PuiToast from './pui-toast.vue'

const TOAST_DIRECTIONS = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right'
]

const Toast = Vue.extend(PuiToast)
function ToastController () {
  this.taskQueue = []
  this.isWorking = false
  this.toasts = new Map()
  this.toastOptions = {
    y: 5,
    x: 5,
    width: '500px',
    type: 'success',
    lifeTime: 2000,
    distance: 5,
    direction: 'top-left'
  }
  this.directionState = {}
  TOAST_DIRECTIONS.forEach(direction => { this.directionState[direction] = 0 })
  Object.preventExtensions(this.directionState)
  Object.preventExtensions(this.toastOptions)
}

ToastController.prototype.createToasts = async function (toastProps = []) {
  /*
   * 비동기 토스트 DOM 생성 작업을 진행중이라면 별도로 구성한 토스트 컨트롤러의 작업큐에 다음의 작업을 추가하고
   * 함수의 실행을 종료합니다. 만약 진행중이던 작업이 없다면 생성 작업을 실행하고 함수의 마지막 실행로직에
   * 태스크큐에 남은 작업이 있다면 추가했던 작업을 꺼내서 생성 작업을 이어나가도록 합니다.
   */
  if (this.isWorking) {
    return this.taskQueue.push(toastProps)
  }
  this.isWorking = true
  const nextTask = this.taskQueue.shift() || toastProps
  await this.resolveTask(nextTask)
  this.isWorking = false
  if (this.taskQueue.length >= 1) {
    this.createToasts()
  }
}

ToastController.prototype.resolveTask = async function (nextTask) {
  for (let i = 0; i < nextTask.length; i++) {
    const props = Object.assign({}, this.toastOptions, nextTask[i])
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
    this.toasts.set(toastInstance._uid, toastInstance)

    await this.moveToasts({
      toasts: sameDirectionToasts,
      diff: toastInstance.getScrollHeight(),
      direction: props.direction
    })
    toastInstance.startLife()
  }
}

ToastController.prototype.moveToasts = async function ({ toasts, diff, direction }) {
  await Promise.all(toasts.map(toast => toast.move(diff, direction)))
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
