<template>
  <transition
    name="fade-slide"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
  >
    <div class="pui-modal" v-show="isVisible" @click="onClick">
        <div class="pui-modal-content" @click.stop>
            <component
              :is="modalComp"
              v-bind="modalProps"
              @close="onClose"
              @close-all="onCloseAll"
            />
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'pui-modal',
  props: {
    modalId: {
      type: Number,
      required: true
    },
    modalComp: {
      type: Object,
      required: true
    },
    modalProps: {
      type: Object,
      required: false,
      default: () => {}
    },
    modalOptions: {
      type: Object,
      required: false,
      default: () => {}
    },
    modalHandlers: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      isVisible: false
    }
  },
  mounted () {
    this.isVisible = true
    window.addEventListener('keydown', this.onEscape)
  },
  methods: {
    onClick () {
      if (this.modalOptions.clickToClose) {
        this.$emit('close', this.modalId)
      }
    },
    onEscape (event) {
      const keyCode = event.keyCode || event.which
      if (this.modalOptions.escapeToClose && keyCode === 27) {
        this.$emit('close', this.modalId)
      }
    },
    onClose () {
      this.isVisible = false
    },
    onCloseAll () {
      this.$emit('close-all')
    },
    onAfterEnter () {
      if (this.isValidHandler('after-show')) {
        this.modalHandlers['after-show']()
      }
    },
    onBeforeLeave () {
      if (this.isValidHandler('before-close')) {
        this.modalHandlers['before-close']()
      }
    },
    onAfterLeave () {
      this.$emit('close', this.modalId)
    },
    isValidHandler (handlerKey) {
      return handlerKey in this.modalHandlers && typeof this.modalHandlers[handlerKey] === 'function'
    }
  }
}
</script>

<style lang="scss" scoped>
  .pui-modal{
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
