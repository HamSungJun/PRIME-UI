<template>
  <div
    :class="[
      'pui-slider',
      'pui-slider--theme-' + theme,
      {
        'pui-slider--is-border': border,
        'pui-slider--status-disabled': disabled
      },
      customClass ? customClass : ''
    ]"
  >
    <div
      v-if="useStep"
      :class="['pui-slider__item', 'item-step']"
    >
      <slot>-</slot>
    </div>
    <div
      :class="[
        'pui-slider__item',
        'item-slider',
        {
          'item-slider--is-border': border
        }
      ]">
      <div :class="['slider-rail']">
        <div :style="sliderGaugeStyle" :class="['slider-gauge']"></div>
        <span
          :class="[
            'slider-ball',
            {
              'cursor-grab': !isGrabbing,
              'cursor-grabbing': isGrabbing
            }
          ]"
          @mousedown.stop.prevent="onGrabStart"
        >
        </span>
      </div>
    </div>
    <div
      v-if="useStep"
      :class="['pui-slider__item', 'item-step']"
    >
     <slot>+</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pui-slider',
  props: {
    theme: {
      type: String,
      defalut: 'dark',
      required: false
    },
    border: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    min: {
      type: Number,
      default: 0,
      required: false
    },
    max: {
      type: Number,
      default: 1,
      required: false
    },
    useStep: {
      type: Boolean,
      default: false,
      required: false
    },
    stepCount: {
      type: Number,
      default: 10,
      required: false
    },
    useThrottle: {
      type: Boolean,
      default: false,
      required: false
    },
    throttleFrequency: {
      type: Number,
      default: 144,
      required: false
    },
    customClass: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      isGrabbing: false
    }
  },
  computed: {
    sliderGaugeStyle () {
      return {
        width: this.gaugeWidth + '%'
      }
    }
  },
  mounted () {
    window.addEventListener('mouseup', this.onGrabEnd, false)
  },
  methods: {
    onGrabStart () {
      this.isGrabbing = true
      document.body.classList.add('cursor-grabbing')
    },
    onGrabEnd () {
      this.isGrabbing = false
      document.body.classList.remove('cursor-grabbing')
    }
  }
}
</script>
<style lang="scss" scoped>
/**
 * PUI-SLIDER
 * $slider-themes: (
 *
 * )
 */
 $rail-height: 5px;
.pui-slider{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .pui-slider__item{
    display: flex;
    align-items: center;
    justify-content: center;
    &.item-step{
      width: 40px;
      cursor: pointer;
    }
    &.item-slider{
      flex-grow: 1;
      padding: 0px $rail-height * 2 + 5;
      &.item-slider--is-border{
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
      }
      .slider-rail{
        position: relative;
        display: inline-block;
        background-color: #ccc;
        width: 100%;
        height: $rail-height;
        border-radius: $radius-default;
        cursor: pointer;
        .slider-ball{
          position: absolute;
          top: 50%;
          display: inline-block;
          width: $rail-height * 4;
          height: $rail-height * 4;
          border-radius: $radius-default;
          background-color: yellowgreen;
          transform: translate(-50%, -50%);
        }
        .slider-gauge{
          position: absolute;
          height: 100%;
          border-radius: $radius-default;
        }
      }
    }
  }
  &.pui-slider--is-border{
    border: 1px solid #ccc;
  }
  &.pui-slider--status-disabled{
    @include status-disabled;
  }
}
</style>
