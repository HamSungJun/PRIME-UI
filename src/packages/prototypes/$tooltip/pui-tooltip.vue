<template>
  <div
    :style="layerStyle"
    :class="[
      'pui-tooltip-layer',
      `layer-theme-${layerTheme}`,
      layerAnimation,
      layerCustomClass
     ]"
    ref="pui-tooltip-layer"
    @click.stop
  >
    {{textContent}}
  </div>
</template>

<script>
export default {
  name: 'pui-tooltip',
  props: {
    source: {
      type: HTMLElement,
      required: true
    },
    textContent: {
      type: String,
      required: true
    },
    tooltipId: {
      type: Number,
      required: true
    },
    tooltipOptions: {
      type: Object,
      default: () => {},
      required: false
    },
    tooltipHandlers: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data () {
    return {
      layerEl: null,
      layerTop: 0,
      layerLeft: 0,
      delayTimerId: null,
      isAppearing: true,
      isComponentVisible: false
    }
  },
  computed: {
    layerTheme () {
      return this.tooltipOptions.theme || 'dark'
    },
    layerStyle () {
      const { layerTop, layerLeft, isComponentVisible } = this
      const { useAnimation, animationDuration, customStyle } = this.tooltipOptions
      return {
        ...(useAnimation ? { animationDuration: `${animationDuration}s` } : {}),
        ...(customStyle || {}),
        top: `${layerTop}px`,
        left: `${layerLeft}px`,
        visibility: isComponentVisible ? 'visible' : 'hidden'
      }
    },
    layerAnimation () {
      const { isAppearing, isComponentVisible } = this
      const { useAnimation, animationName } = this.tooltipOptions
      if (!useAnimation) return ''
      return isComponentVisible ? `layer-${animationName}-${isAppearing ? 'in' : 'out'}` : ''
    },
    layerCustomClass () {
      const { customStyle, customClass } = this.tooltipOptions
      return !customStyle ? customClass : ''
    }
  },
  mounted () {
    this.layerEl = this.$refs['pui-tooltip-layer']
    const source = this.source
    const target = this.layerEl
    const { autoPlacement, placement, distance, showDelay } = this.tooltipOptions
    const { top, left } = this.$common.placeAt({ source, target, placement, distance, autoPlacement })
    this.layerTop = top
    this.layerLeft = left
    if (showDelay > 0) {
      this.delayTimerId = setTimeout(this.showTooltip, showDelay * 1000)
    } else {
      this.showTooltip()
    }
  },
  destroyed () {
    this.onAfterHide()
    clearTimeout(this.delayTimerId)
  },
  methods: {
    onHide () {
      const { hideDelay } = this.tooltipOptions
      if (hideDelay > 0) {
        clearTimeout(this.delayTimerId)
        this.delayTimerId = setTimeout(this.hideTooltip, hideDelay * 1000)
      }
      this.hideTooltip()
    },
    onHideEnd () {
      this.isComponentVisible = false
      this.$emit('hide', { tooltipId: this.tooltipId })
    },
    onAfterShow () {
      if ('after-show' in this.tooltipHandlers) {
        this.tooltipHandlers['after-show']()
      }
    },
    onAfterHide () {
      if ('after-hide' in this.tooltipHandlers) {
        this.tooltipHandlers['after-hide']()
      }
    },
    showTooltip () {
      this.isAppearing = true
      this.isComponentVisible = true
      this.onAfterShow()
    },
    hideTooltip () {
      const { useAnimation } = this.tooltipOptions
      if (useAnimation) {
        this.$refs['pui-tooltip-layer'].addEventListener('animationend', this.onHideEnd)
        this.isAppearing = false
      } else {
        this.onHideEnd()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$tooltip-animation-names: 'fade';
$tooltip-themes: (
  'dark': (
    background-color: rgba(39, 44, 52, 0.80),
    border: 1px solid rgba(39, 44, 52, 0.80),
    color: white
  ),
  'light': (
    background-color: white,
    border: 1px solid rgba(39, 44, 52, 0.80),
    color: rgba(39, 44, 52, 1)
  )
);

.pui-tooltip-layer{
  position: absolute;
  display: inline-block;
  word-break: break-all;
  text-align: left;
  padding: 5px 8px;
  border-radius: 2px;
  line-height: 1.25;
  font-weight: 400;
  font-size: 0.85rem;
  width: max-content;
  max-width: 200px;
  @each $animationName in $tooltip-animation-names {
    &.layer-#{$animationName}-in{
      @include animation-props(#{$animationName}In);
    }
    &.layer-#{$animationName}-out{
      @include animation-props(#{$animationName}Out);
    }
  }
  @each $theme-name, $theme-map in $tooltip-themes {
    &.layer-theme-#{$theme-name}{
      background-color: map-get($map: $theme-map, $key: background-color);
      border: map-get($map: $theme-map, $key: border);
      color: map-get($map: $theme-map, $key: color);
    }
  }
}
</style>
