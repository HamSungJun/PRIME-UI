<template>
  <label
    :class="[
      'pui-checkbox',
      'pui-checkbox--theme-' + (theme || 'dark'),
      {
        'pui-checkbox--is-block': block,
        'pui-checkbox--is-border': border,
        'pui-checkbox--status-disabled': disabled
      },
      customClass ? customClass : ''
    ]"
    @click.stop="onClick($event)"
  >
    <span
      :class="[
        'pui-checkbox__box',
        'pui-checkbox__box--shape-' + (boxShape || 'default'),
        {
          'pui-checkbox__box--checked': checked
        }
      ]"
    >
    </span>
    <span
      v-if="label"
      :class="[
        'pui-checkbox__label',
        {
          'pui-checkbox__label--checked': checked
        }
      ]"
    >
      {{label}}
    </span>
  </label>
</template>
<script>
export default {
  name: 'pui-checkbox',
  props: {
    index: {
      type: Number,
      required: false
    },
    checked: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      default: '',
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
    boxShape: {
      type: String,
      default: 'rect',
      required: false
    },
    customClass: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    hasIndex () {
      return typeof this.index === 'number' && this.index >= 0
    }
  },
  methods: {
    onClick ($event) {
      this.$emit('change', this.hasIndex ? { index: this.index } : this.label)
    }
  }
}
</script>
<style lang="scss" scoped>
/**
 * PUI-CHECKBOX
 * $checkbox-themes: ($theme, $label-border-color, $box-border-color, $box-background-color, $check-border-color, $label-color, $label-checked-color, $label-hover-color)
 */
$checkbox-themes:
('dark', $color-dark, $color-dark, $color-lightdark, #ffffff, $color-dark, $color-dark, $color-lightdark),
('blue', $color-blue, $color-blue, $color-lightblue, #ffffff, $color-dark, $color-blue, $color-lightblue),
('gray', $color-gray, $color-gray, $color-lightgray, #ffffff, $color-dark, $color-gray, $color-lightgray),
('green', $color-green, $color-green, $color-lightgreen, #ffffff, $color-dark, $color-green, $color-lightgreen),
('orange', $color-orange, $color-orange, $color-lightorange, #ffffff, $color-dark, $color-orange, $color-lightorange),
('red', $color-red, $color-red, $color-lightred, #ffffff, $color-dark, $color-red, $color-lightred);

$box-shapes:
('default', $radius-default),
('rect', $radius-rect);

$checkbox-box-transition: all 0.25s ease;
$checkbox-label-tranition: color 0.25s ease;

.pui-checkbox{
  display: inline-block;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.4rem;

  &.pui-checkbox--is-block{
    display: block;
  }

  &.pui-checkbox--is-border{
    border-width: 1px;
    border-style: solid;
    border-radius: $radius-rect;
  }

  &.pui-checkbox--status-disabled{
    @include status-disabled;
  }

  .pui-checkbox__box{
    display: inline-block;
    position: relative;
    width: 1rem;
    height: 1rem;
    margin-right: 4px;
    border-width: 1px;
    border-style: solid;
    transition: $checkbox-box-transition;
    vertical-align: top;
    &::after{
      content: '';
      position: absolute;
      top: 45%;
      left: 50%;
      width: 50%;
      height: 25%;
      transform: translate(-50%, -50%) rotate(-45deg);
      transform-origin: center;
      border: 1px solid transparent;
      border-top: 0;
      border-right: 0;
    }
  }

  .pui-checkbox__label{
    vertical-align: top;
    transition: $checkbox-label-tranition;
    display: inline-block;
    transform: translateY(-1px);
  }

  @each $theme, $label-border-color, $box-border-color, $box-background-color, $check-border-color, $label-color, $label-checked-color, $label-hover-color in $checkbox-themes {
    &.pui-checkbox--theme-#{$theme}{
      border-color: $label-border-color;
      &:hover{
        .pui-checkbox__label{
          color: $label-hover-color;
        }
      }

      .pui-checkbox__box{
        border-color: $box-border-color;
        &::after{
          background-color: transparent;
        }
        &.pui-checkbox__box--checked{
          background-color: $box-background-color;
          &::after{
            border-color: $check-border-color;
          }
        }
      }

      .pui-checkbox__label{
        color: $label-color;
        &.pui-checkbox__label--checked{
          color: $label-checked-color;
        }
      }
    }
  }

}
</style>
