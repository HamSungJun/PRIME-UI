<template>
  <div
    :class="[
      'pui-toast',
      'pui-toast-type--' + toastProps.type,
      {
        'pui-toast-status--visible': isVisible
      }
    ]"
    :style="toastStyle"
    ref="toast"
  >
    {{toastProps.message || ''}}
  </div>
</template>
<script>
export default {
  name: 'pui-toast',
  props: {
    controllerRef: Object,
    toastProps: Object
  },
  data () {
    return {
      isVisible: false,
      top: this.toastProps.top,
      left: this.toastProps.left,
      translateY: 0
    }
  },
  computed: {
    toastStyle () {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.toastProps.width,
        visibility: this.isVisible ? 'visible' : 'hidden',
        transform: `translateY(${this.translateY}px)`
      }
    }
  },
  mounted () {

  },
  methods: {
    startLife () {
      this.isVisible = true
      setTimeout(this.endLife, this.toastProps.lifeTime)
    },
    endLife () {
      this.$el.addEventListener('transitionend', () => {
        this.controllerRef.deleteToast(this._uid)
        this.$el.remove()
        this.$destroy()
      })
      this.isVisible = false
    },
    getScrollHeight () {
      return this.$el.scrollHeight
    },
    move (diff) {
      this.translateY += (diff + this.toastProps.distance)
    }
  }
}
</script>
<style lang="scss" scoped>
/**
 * PUI-TOAST
 * $toast-types: (
 *   $type,
 *   $toast-border-color,
 *   $toast-backgrond-color
 *   $toast-message-color,
 * )
 */
$toast-types:
('success', $color-lightgreen3, $color-lightgreen4, $color-darkgreen2),
('warning', $color-lightorange3, $color-lightorange4, $color-darkorange2),
('error', $color-lightred3, $color-lightred4, $color-darkred2),
('info', $color-lightgray2, $color-lightgray3, $color-darkgray2);

.pui-toast{
  position: fixed;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: calc(100% - 10px);
  border-radius: $radius-rect;
  overflow: hidden;
  opacity: 0;
  transition: all 0.25s ease;
  border-width: 1px;
  border-style: solid;
  @each $toast-type, $toast-border-color, $toast-background-color,$toast-message-color in $toast-types{
    &.pui-toast-type--#{$toast-type}{
      border-color: $toast-border-color;
      background-color: $toast-background-color;
      color: $toast-message-color;
      font-weight: 400;
    }
  }

  &.pui-toast-status--visible{
    opacity: 1;
  }
}
</style>
