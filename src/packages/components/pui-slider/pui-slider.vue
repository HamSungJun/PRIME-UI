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
    ref="slider"
  >
    <div
      v-if="useStep"
      :class="['pui-slider__item', 'item-step']"
      @click.stop="onSliderStep(-1)"
    >
      <slot>-</slot>
    </div>
    <div
      :class="[
        'pui-slider__item',
        'item-slider',
        {
          'item-slider--is-border': border && useStep
        }
      ]">
      <div :class="['slider-rail']" ref="rail" @click.stop="onRailClick">
        <div :style="sliderGaugeStyle" :class="['slider-gauge']"></div>
        <span
          :style="sliderBallStyle"
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
      @click.stop="onSliderStep(1)"
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
      default: 'dark',
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
      required: true
    },
    max: {
      type: Number,
      default: 1,
      required: true
    },
    value: {
      type: Number,
      default: 0.25,
      required: true
    },
    useWheel: {
      type: Boolean,
      default: false,
      required: false
    },
    wheelStep: {
      type: Number,
      default: 0.005,
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
      gauge: 0,
      isGrabbing: false,
      slider: null,
      sliderRail: null,
      sliderBall: null,
      throttledMoveHandler: null,
      throttledWheelHandler: null
    }
  },
  computed: {
    sliderGaugeStyle () {
      return {
        width: (this.gauge * 100) + '%'
      }
    },
    sliderBallStyle () {
      return {
        left: (this.gauge * 100) + '%'
      }
    },
    normalizedValue () {
      return Number((this.min + ((this.max - this.min) * this.gauge)).toFixed(3))
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.calcGauge({
          eventType: 'prop',
          propValue: newVal
        })
      }
    }
  },
  mounted () {
    this.slider = this.$refs.slider
    this.updateSliderRect()
    if (this.useWheel) {
      this.throttledWheelHandler =
        this.useThrottle
          ? this.$common.wrapThrottle(this.onSliderWheel, this.throttleFrequency)
          : this.onSliderWheel
      this.slider.addEventListener('wheel', (event) => {
        event.preventDefault()
        this.throttledWheelHandler(event)
      }, false)
    }
    /* 이 문장은 윈도우의 사이즈가 변화하였을 때 Viewport와 DOMRect().left 의 거리를 갱신해주기 위함이다. */
    window.addEventListener('resize', this.$common.wrapDebounce(this.updateSliderRect, { duration: 500 }), false)
    this.calcGauge({
      eventType: 'prop',
      propValue: this.value
    })
  },
  methods: {
    onGrabStart () {
      this.isGrabbing = true
      this.throttledMoveHandler =
        this.useThrottle
          ? this.$common.wrapThrottle(this.onGrabMove, this.throttleFrequency) : this.onGrabMove
      window.addEventListener('mousemove', this.throttledMoveHandler, false)
      window.addEventListener('mouseup', this.onGrabEnd, false)
      document.body.classList.add('cursor-grabbing')
    },
    onGrabMove (event) {
      if (this.isGrabbing) {
        this.calcGauge({
          eventType: 'move',
          event
        })
      }
      this.emitValue()
    },
    onGrabEnd () {
      this.isGrabbing = false
      document.body.classList.remove('cursor-grabbing')
      window.removeEventListener('mousemove', this.throttledMoveHandler)
      window.removeEventListener('mouseup', this.onGrabEnd)
    },
    onRailClick (event) {
      this.calcGauge({
        eventType: 'click',
        event
      })
      this.emitValue()
    },
    onSliderWheel (event) {
      this.calcGauge({
        eventType: 'wheel',
        event
      })
      this.emitValue()
    },
    onSliderStep (diff) {
      this.calcGauge({
        eventType: 'step',
        diff
      })
      this.emitValue()
    },
    calcGauge ({ event, eventType, diff, propValue }) {
      switch (eventType) {
        case 'move':
        case 'click':
          this.gauge = Math.min(
            Math.max(event.clientX - this.sliderRail.left, 0) / this.sliderRail.width * 1,
            1
          )
          break
        case 'wheel':
          this.gauge = Math.min(
            Math.max(this.gauge + (-1 * this.wheelStep * event.deltaY), 0),
            1
          )
          break
        case 'step':
          this.gauge = Math.min(
            Math.max(this.gauge + (1 / this.stepCount * diff), 0),
            1
          )
          break
        case 'prop':
          this.gauge = Math.min(
            Math.max(((propValue - this.min) / (this.max - this.min)), 0),
            1
          )
      }
    },
    emitValue () {
      this.$emit('change', this.normalizedValue)
    },
    updateSliderRect () {
      this.sliderRail = this.$refs.rail.getBoundingClientRect()
    }
  }
}
</script>
<style lang="scss" scoped>
/**
 * PUI-SLIDER
 * $slider-themes: (
 *   $theme,
 *   $slider-border-color,
 *   $slider-step-icon-color,
 *   $slider-rail-color,
 *   $slider-gauge-color,
 *   $slider-ball-border-color,
 *   $slider-ball-background-color
 * )
 */

$slider-themes:
  ("dark",$color-dark,$color-dark,$color-lightgray2,$color-dark,$color-dark,$color-lightdark2),
  ("blue",$color-blue,$color-blue,$color-lightgray2,$color-blue,$color-blue,$color-lightblue2),
  ("gray",$color-gray,$color-gray,$color-lightgray2,$color-gray,$color-gray,$color-lightgray2),
  ("green",$color-green,$color-green,$color-lightgray2,$color-green,$color-green,$color-lightgreen2),
  ("orange",$color-orange,$color-orange,$color-lightgray2,$color-orange,$color-orange,$color-lightorange2),
  ("red",$color-red,$color-red,$color-lightgray2,$color-red,$color-red,$color-lightred2);

$rail-height: 5px;
$ball-size: $rail-height * 3.5;
$slider-horizontal-padding: $rail-height * 2 + 5;
.pui-slider{
  height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: calc(100%);
  height: calc(100%);
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
      padding: 0px $slider-horizontal-padding;
      &.item-slider--is-border{
        border-right-width: 1px;
        border-left-width: 1px;
        border-right-style: solid;
        border-left-style: solid;
      }
      .slider-rail{
        position: relative;
        display: inline-block;
        width: 100%;
        height: $rail-height;
        border-radius: $radius-default;
        cursor: pointer;
        .slider-ball{
          position: absolute;
          top: 50%;
          display: inline-block;
          width: $ball-size;
          height: $ball-size;
          border-radius: $radius-default;
          border-width: 2px;
          border-style: solid;
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
    border-width: 1px;
    border-style: solid;
  }
  &.pui-slider--status-disabled{
    @include status-disabled;
  }
  @each
    $theme,
    $slider-border-color,
    $slider-step-icon-color,
    $slider-rail-color,
    $slider-gauge-color,
    $slider-ball-border-color,
    $slider-ball-background-color
  in
   $slider-themes {
    &.pui-slider--theme-#{$theme} {
      border-color: $slider-border-color;
      .item-step{
        color: $slider-step-icon-color;
      }
      .item-slider{
        border-color: $slider-border-color;
        .slider-rail{
          background-color: $slider-rail-color;
          .slider-gauge{
            background-color: $slider-gauge-color;
          }
          .slider-ball{
            border-color: $slider-ball-border-color;
            background-color: $slider-ball-background-color;
          }
        }
      }
    }
  }
}
</style>
