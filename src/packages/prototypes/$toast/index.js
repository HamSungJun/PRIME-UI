import toastController from './toastcontroller'
const setOptions = () => {
  toastController.setOptions()
}
const createToasts = (toastProps = []) => {
  toastController.createToasts(toastProps)
}
const deleteToastAll = () => {
  toastController.deleteToastAll()
}
export default {
  name: '$toast',
  setOptions,
  createToasts,
  deleteToastAll
}
