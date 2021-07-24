<template>
  <div :style="popoverContainerStyle" class="pui-popover-container">
      <pui-popover
        v-for="popoverRef in popoverRefs"
        :key="popoverRef.popoverId"
        v-bind="popoverRef"
        @close="onClose"
        @close-all="onCloseAll"
      >
      </pui-popover>
  </div>
</template>

<script>
import { PUI_DEFAULT_POPOVER_CONTAINER_ZINDEX } from '../../constants'
export default {
  name: 'pui-popover-container',
  props: {
    zIndex: {
      type: Number,
      default: PUI_DEFAULT_POPOVER_CONTAINER_ZINDEX
    }
  },
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
        this.clearPopovers()
      }
      popoverParams.popoverId = this.nextPopoverId
      this.nextPopoverId += 1
      this.popoverRefs.push(popoverParams)
    },
    onClose ({ popoverId }) {
      this.popoverRefs.splice(
        this.popoverRefs.findIndex(popoverRef => popoverRef.popoverId === popoverId),
        1
      )
    },
    onCloseAll () {
      this.clearPopovers()
    },
    clearPopovers () {
      this.popoverRefs = []
      this.nextPopoverId = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.pui-popover-container {
  position: fixed;
}
</style>
