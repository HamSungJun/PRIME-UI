<template>
  <div :style="popoverContainerStyle" class="pui-popover-container">
      <pui-popover
        v-for="popoverRef in popoverRefs"
        :key="popoverRef.popoverId"
        v-bind="popoverRef"
        @close="onClose"
        @close-all="onCloseAll"
        ref="pui-popover"
      >
      </pui-popover>
  </div>
</template>

<script>
export default {
  name: 'pui-popover-container',
  data () {
    return {
      popoverRefs: [],
      nextPopoverId: 0
    }
  },
  computed: {
    popoverContainerStyle () {
      return {
        zIndex: this.zIndex
      }
    }
  },
  created () {
    const { onOpen, onClose, onCloseAll } = this
    this.$popover.PUI_POPOVER_BUS.$on('open', onOpen)
    this.$popover.PUI_POPOVER_BUS.$on('close', onClose)
    this.$popover.PUI_POPOVER_BUS.$on('close-all', onCloseAll)
  },
  mounted () {
    const { clickToClose, resizeToClose, scrollToClose } = this.defaultPopoverOptions
    if (clickToClose) {
      window.addEventListener('click', this.onWindowClick)
    }
    if (resizeToClose) {
      this.onWindowResize = this.$common.wrapDebounce(this.onWindowResize, { duration: 250, initial: true })
      window.addEventListener('resize', this.onWindowResize)
    }
    if (scrollToClose) {
      this.onWindowScroll = this.$common.wrapDebounce(this.onWindowScroll, { duration: 250, initial: true })
      window.addEventListener('scroll', this.onWindowScroll, { capture: true })
    }
  },
  methods: {
    getPopoverComponents () {
      return (this.$refs['pui-popover'] || [])
    },
    onOpen (popoverParams) {
      const { useStack } = popoverParams.popoverOptions
      if (!useStack) {
        this.onCloseAll()
      }
      popoverParams.popoverId = this.nextPopoverId
      this.nextPopoverId = (this.nextPopoverId + 1) % this.defaultMaxRotateId
      this.popoverRefs.push(popoverParams)
    },
    onClose ({ popoverId }) {
      this.popoverRefs.splice(
        this.popoverRefs.findIndex(popoverRef => popoverRef.popoverId === popoverId),
        1
      )
    },
    onCloseAll () {
      this.getPopoverComponents().forEach(popoverComponent => {
        popoverComponent.onClose()
      })
    },
    onWindowClick () {
      this.getPopoverComponents().forEach(popoverComponent => {
        if (popoverComponent.popoverOptions.clickToClose) {
          popoverComponent.onClose()
        }
      })
    },
    onWindowResize () {
      this.getPopoverComponents().forEach(popoverComponent => {
        if (popoverComponent.popoverOptions.resizeToClose) {
          popoverComponent.onClose()
        }
      })
    },
    onWindowScroll (event) {
      if (event.target instanceof HTMLElement && event.target.closest('.__PUI_POPOVER_LAYER__')) return
      this.getPopoverComponents().forEach(popoverComponent => {
        if (popoverComponent.popoverOptions.scrollToClose) {
          popoverComponent.onClose()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pui-popover-container {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
