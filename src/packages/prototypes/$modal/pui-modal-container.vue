<template>
    <div class="pui-modal-container">
        <pui-modal
            v-for="modalRef in modalRefs"
            :key="modalRef.id"
            v-bind="modalRef"
            @close="close"
            @close-all="closeAll"
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
    this.$modal.modalBus.$on('show', this.show)
    this.$modal.modalBus.$on('close', this.close)
    this.$modal.modalBus.$on('close-all', this.closeAll)
  },
  methods: {
    show (modalRef) {
      Object.defineProperty(modalRef, 'id', {
        value: this.nextModalId++,
        writable: false,
        enumerable: false,
        configurable: false
      })
      this.modalRefs.push(modalRef)
    },
    close (modalId) {
      this.modalRefs.splice(
        this.modalRefs.findIndex(modalRef => modalRef.id === modalId),
        1
      )
    },
    closeAll () {
      this.modalRefs = []
      this.nextModalId = 0
    }
  }
}
</script>

<style>

</style>
