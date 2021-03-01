import toastController from './toastcontroller'
export default {
  name: '$toast',
  createToasts: toastController.createToasts.bind(toastController),
  deleteToastAll: toastController.deleteToastAll.bind(toastController)
}
