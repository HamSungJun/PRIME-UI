<template>
  <label
    :class="[
      'pui-radio',
      'pui-radio--theme-' + (theme || 'dark'),
      {
        'pui-radio--is-block': block,
        'pui-radio--is-border': border,
        'pui-radio--status-disabled': disabled
      },
      customClass ? customClass : ''
    ]"
    @click.stop="onClick($event, label)"
  >
    <span
      :class="[
        'pui-radio__circle',
        'pui-radio__circle--shape-' + (radioShape || 'circle'),
        {
          'pui-radio__circle--selected': isSelected,
        }
      ]"
    >
    </span>
    <span
      v-if="label"
      :class="[
        'pui-radio__label',
        {
          'pui-radio__label--selected': isSelected
        }
      ]"
    >
      {{label}}
    </span>
  </label>
</template>
<script>
export default {
  name: 'pui-radio',
  props: {
    selectValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'dark',
      required: false
    },
    block: {
      type: Boolean,
      default: false,
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
    customClass: {
      type: String,
      default: '',
      required: false
    },
    radioShape: {
      type: String,
      default: 'circle',
      required: false
    }
  },
  computed: {
    isSelected () {
      return Object.is(this.selectValue, this.label)
    }
  },
  methods: {
    onClick (event, label) {
      this.$emit('change', { event, label })
    }
  }
}
</script>
<style lang="scss" scoped>
/**
 * PUI-RADIO
 * $radio-themes: ($theme, $label-border-color, $circle-border-color, $circle-background-color, $circle-inner-background-color, $label-color, $label-selected-color, $radio-hover-color)
 */
$radio-themes:
('dark', $color-dark, $color-dark, $color-lightdark, #ffffff, $color-dark, $color-dark, $color-lightdark),
('blue', $color-blue, $color-blue, $color-lightblue, #ffffff, $color-dark, $color-blue, $color-lightblue),
('gray', $color-gray, $color-gray, $color-lightgray, #ffffff, $color-dark, $color-gray, $color-lightgray),
('green', $color-green, $color-green, $color-lightgreen, #ffffff, $color-dark, $color-green, $color-lightgreen),
('orange', $color-orange, $color-orange, $color-lightorange, #ffffff, $color-dark, $color-orange, $color-lightorange),
('red', $color-red, $color-red, $color-lightred, #ffffff, $color-dark, $color-red, $color-lightred);

$radio-shapes:
('rect', $radius-rect),
('circle', $radius-circle);

$radio-circle-transition: all 0.25s ease;
$radio-label-transition: color 0.25s ease;

.pui-radio {
  display: inline-block;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.4rem;

  &.pui-radio--is-block{
    display: block;
  }

  &.pui-radio--is-border{
    border-width: 1px;
    border-style: solid;
    border-radius: $radius-rect;
  }

  &.pui-radio--status-disabled{
    @include status-disabled;
  }

  .pui-radio__circle{
    display: inline-block;
    position: relative;
    width: 1rem;
    height: 1rem;
    margin-right: 4px;
    border-width: 1px;
    border-style: solid;
    transition: $radio-circle-transition;
    vertical-align: top;

    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: #ffffff;
    }

    @each $radio-shape, $radius in $radio-shapes{
      &.pui-radio__circle--shape-#{$radio-shape}{
        border-radius: $radius;
        &::after{
          border-radius: $radius;
        }
      }
    }

  }

  .pui-radio__label{
    vertical-align: top;
    transition: $radio-label-transition;
    display: inline-block;
    transform: translateY(-1px);
  }

  @each $theme, $label-border-color, $circle-border-color, $circle-background-color, $circle-inner-background-color, $label-color, $label-selected-color, $radio-hover-color in $radio-themes{
    &.pui-radio--theme-#{$theme}{
      border-color: $label-border-color;
      &:hover{
        .pui-radio__circle{
          background-color: $circle-background-color;
          &::after{
            background-color: $circle-inner-background-color;
          }
        }
      }

      .pui-radio__circle{
        border-color: $circle-border-color;
        &::after{
          background-color: transparent;
        }
        &.pui-radio__circle--selected{
          background-color: $circle-background-color;
          &::after{
            background-color: $circle-inner-background-color;
          }
        }
      }

      .pui-radio__label{
        color: $label-color;
        &.pui-radio__label--selected{
          color: $label-selected-color;
        }
      }

    }
  }

}
</style>
