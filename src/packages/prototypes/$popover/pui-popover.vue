<template>
  <div
    :style="layerStyle"
    :class="[
      'pui-popover-layer',
      layerAnimation
    ]"
    ref='pui-popover-layer'
    @click.stop
  >
    <component
        :is="popoverComp"
        v-bind="popoverProps"
        @close="onClose"
        @close-all="onCloseAll"
        ref="pui-popover-target"
    />
  </div>
</template>

<script>
export default {
  name: 'pui-popover',
  props: {
    source: {
      type: HTMLElement,
      required: true
    },
    popoverId: {
      type: Number,
      required: true
    },
    popoverComp: {
      type: Object,
      required: true
    },
    popoverProps: {
      type: Object,
      required: true
    },
    popoverOptions: {
      type: Object,
      required: true
    },
    popoverHandlers: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      layerTop: 0,
      layerLeft: 0,
      isAppearing: true,
      isComponentVisible: false
    }
  },
  computed: {
    layerStyle () {
      const { layerTop, layerLeft } = this
      const { useAnimation, animationDuration } = this.popoverOptions
      return {
        top: `${layerTop}px`,
        left: `${layerLeft}px`,
        visibility: this.isComponentVisible ? 'visible' : 'hidden',
        ...(useAnimation && { animationDuration: `${animationDuration}s` })
      }
    },
    layerAnimation () {
      const { isAppearing } = this
      const { animationName } = this.popoverOptions
      return `layer-${animationName}-${isAppearing ? 'in' : 'out'}`
    }
  },
  mounted () {
    //* $nextTick() 함수를 통해 동적 컴포넌트의 Layout 페이즈를 완료한 후 위치 계산을 시작합니다.
    this.$nextTick(() => {
      const source = this.source
      const target = this.$refs['pui-popover-target'].$el
      const placement = this.popoverOptions.placement
      const { damage, top, left } = this.$common.placeAt({ source, target, placement })
      console.log(damage, top, left)
      this.layerTop = top
      this.layerLeft = left
      this.isComponentVisible = true
      if ('after-open' in this.popoverHandlers) {
        this.popoverHandlers['after-open']()
      }
    })
  },
  destroyed () {
    if ('after-close' in this.popoverHandlers) {
      this.popoverHandlers['after-close']()
    }
  },
  methods: {
    onClose () {
      const { useAnimation } = this.popoverOptions
      if (useAnimation) {
        this.$refs['pui-popover-layer'].addEventListener('animationend', this.onCloseEnd)
      } else {
        this.onCloseEnd()
      }
      this.isAppearing = false
    },
    onCloseEnd () {
      this.isComponentVisible = false
      this.$emit('close', { popoverId: this.popoverId })
    },
    onCloseAll () {
      this.$emit('close-all')
    }
  }
}
</script>

<style lang="scss" scoped>
.pui-popover-layer{
  position: fixed;
  &.layer-fade-in{
    @include animation-props(fadeIn);
  }
  &.layer-fade-out{
    @include animation-props(fadeOut);
  }
}

</style>
