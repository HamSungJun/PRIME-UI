<template>
    <div
      class="pui-modal-container"
      v-show="modalRefs.length > 0"
    >
        <pui-modal
          v-for="modalRef in modalRefs"
          :key="modalRef.modalId"
          v-bind="modalRef"
          @close="onClose"
          @close-all="onCloseAll"
        >
        </pui-modal>
    </div>
</template>

<script>
export default {
  name: 'pui-modal-container',
  data () {
    return {
      modalRefs: [],
      nextModalId: 0
    }
  },
  mounted () {
    this.$modal.PUI_MODAL_BUS.$on('show', this.show)
    this.$modal.PUI_MODAL_BUS.$on('close', this.close)
    this.$modal.PUI_MODAL_BUS.$on('close-all', this.closeAll)
  },
  methods: {
    show (modalRef) {
      if (!modalRef.modalOptions.useStack) {
        this.onCloseAll()
      }
      modalRef.modalId = this.nextModalId++
      this.modalRefs.push(modalRef)
    },
    onClose (modalId) {
      this.modalRefs.splice(
        this.modalRefs.findIndex(modalRef => modalRef.modalId === modalId),
        1
      )
    },
    onCloseAll () {
      this.modalRefs = []
      this.nextModalId = 0
    }
  }
}
</script>

<style>
  .pui-modal-container{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
  }
</style>
