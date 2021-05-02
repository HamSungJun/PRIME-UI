import toastController from './toastcontroller'

export default {
  name: '$toast',
  install (Vue, options = {}) {
    Vue.prototype.$toast = {
      createToasts: toastController.createToasts.bind(toastController),
      deleteToastAll: toastController.deleteToastAll.bind(toastController)
    }
  }
}
