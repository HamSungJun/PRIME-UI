<template>
  <div :style="tooltipContainerStyle" class="pui-tooltip-container">
      <pui-tooltip
        v-for="tooltipRef in tooltipRefs"
        :key="tooltipRef.tooltipId"
        v-bind="tooltipRef"
        @hide="onHide"
        @hide-all="onHideAll"
        ref="pui-tooltip"
      >
      </pui-tooltip>
  </div>
</template>

<script>
export default {
  name: 'pui-tooltip-container',
  data () {
    return {
      tooltipRefs: [],
      nextTooltipId: 0
    }
  },
  computed: {
    tooltipContainerStyle () {
      return {
        zIndex: this.zIndex
      }
    }
  },
  created () {
    const { onShow, onHide, onHideAll } = this
    this.$tooltip.PUI_TOOLTIP_BUS.$on('show', onShow)
    this.$tooltip.PUI_TOOLTIP_BUS.$on('hide', onHide)
    this.$tooltip.PUI_TOOLTIP_BUS.$on('hide-all', onHideAll)
  },
  mounted () {
    const { clickToClose, resizeToClose, scrollToClose } = this.defaultTooltipOptions
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
    getTooltipComponents () {
      return (this.$refs['pui-tooltip'] || [])
    },
    onShow (tooltipParams) {
      const { useStack } = tooltipParams.tooltipOptions
      if (!useStack) {
        this.onHideAll()
      }
      tooltipParams.tooltipId = this.nextTooltipId
      this.nextTooltipId = (this.nextTooltipId + 1) % this.defaultMaxRotateId
      this.tooltipRefs.push(tooltipParams)
    },
    onHide ({ tooltipId }) {
      this.tooltipRefs.splice(
        this.tooltipRefs.findIndex(tooltipRef => tooltipRef.tooltipId === tooltipId),
        1
      )
    },
    onHideAll () {
      this.getTooltipComponents().forEach(tooltipComponent => {
        tooltipComponent.onHide()
      })
    },
    onWindowClick () {
      this.getTooltipComponents().forEach(tooltipComponent => {
        if (tooltipComponent.tooltipOptions.clickToClose) {
          tooltipComponent.onHide()
        }
      })
    },
    onWindowResize () {
      this.getTooltipComponents().forEach(tooltipComponent => {
        if (tooltipComponent.tooltipOptions.resizeToClose) {
          tooltipComponent.onHide()
        }
      })
    },
    onWindowScroll () {
      this.getTooltipComponents().forEach(tooltipComponent => {
        if (tooltipComponent.tooltipOptions.scrollToClose) {
          tooltipComponent.onHide()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pui-tooltip-container {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
