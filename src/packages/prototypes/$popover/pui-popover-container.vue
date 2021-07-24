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
  methods: {
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
      (this.$refs['pui-popover'] || []).forEach(popoverComponent => {
        popoverComponent.onClose()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pui-popover-container {
  position: fixed;
}
</style>
