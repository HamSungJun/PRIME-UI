<template>
  <label
    :class="[
      'pui-radio',
      type ? 'pui-radio--type-' + type : '',
      size ? 'pui-radio--size-' + size : '',
      {
        'pui-radio--is-block': block,
        'pui-radio--is-border': border,
        'pui-radio--status-disabled': disabled
      },
      customClass ? customClass : ''
    ]"
    @click.stop="onChange($event, label)"
  >
    <span
      :class="[
        'pui-radio__circle',
        {
          'pui-radio__circle--selected': selectValue === label,
          'pui-radio__circle--shape-rect': circleRect,
        }
      ]"
    >
    </span>
    <span
      v-if="$slots.default || label"
      :class="[
        'pui-radio__label'
      ]"
    >
      <slot></slot>
      <template v-if="!slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: 'pui-radio',
  props: {
    selectValue: {
      type: String,
      required: true,
      validator (value) {
        return Object.is(typeof value, 'string')
      }
    },
    label: {
      type: String,
      required: true,
      validator (value) {
        return Object.is(typeof value, 'string')
      }
    },
    type: {
      type: String,
      default: 'default',
      required: false
    },
    size: {
      type: String,
      default: 'default',
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
    circleRect: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    onChange (event, label) {
      this.$emit('change', { event, label })
    }
  }
}
</script>
<style lang="scss" scoped>
/**
 * PUI-RADIO
 * $radio-themes: ($type, $label-border-color, $circle-border-color, $circle-background-color, $circle-inner-background-color, $label-color, $radio-hover-color)
 */
$radio-themes:
('default', $color-default, $color-default, $color-default, #ffffff, $color-default, $color-lightdark),
('primary', $color-primary, $color-primary, $color-primary, #ffffff, $color-default, $color-lightblue),
('info', $color-info, $color-info, $color-info, #ffffff, $color-default, $color-info),
('success', $color-success, $color-success, $color-success, #ffffff, $color-default, $color-lightgreen),
('warning', $color-warning, $color-warning, $color-warning, #ffffff, $color-default, $color-lightorange),
('danger', $color-danger, $color-danger, $color-danger, #ffffff, $color-default, $color-lightred);
$radio-circle-transition: 'all 0.25s ease';
$radio-label-transition: 'color 0.25s ease';
.pui-radio {
  display: inline-block;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.4rem;
  &.pui-radio--is-border{
    border-width: 1px;
    border-style: solid;
    border-radius: $radius-rect;
  }

  &.pui-radio--is-block{
    display: block;
  }

  &.pui-radio--status-disabled{
    @include status-disabled;
  }

  .pui-radio__circle{
    display: inline-block;
    position: relative;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    margin-right: 4px;
    border-width: 1px;
    border-style: solid;
    transition: #{$radio-circle-transition};
    vertical-align: top;
    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      display: inline-block;
      border-radius: 50%;
      width: 4px;
      height: 4px;
      background-color: #ffffff;
    }

    &.pui-radio__circle--shape-rect{
      border-radius: $radius-rect;
      &::after{
        border-radius: $radius-rect;
      }
    }
  }

  .pui-radio__label{
    vertical-align: top;
    transition: #{$radio-label-transition};
    display: inline-block;
    transform: translateY(-1px);
  }

  @each $type, $label-border-color, $circle-border-color, $circle-background-color, $circle-inner-background-color, $label-color, $radio-hover-color in $radio-themes{
    &.pui-radio--type-#{$type}{
      border-color: #{$label-border-color};
      &:hover{
        .pui-radio__circle{
          background-color: $radio-hover-color;
          &::after{
            background-color: $circle-inner-background-color;
          }
        }
      }
      .pui-radio__circle{
        border-color: #{$circle-border-color};
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
      }
    }
  }

}
</style>
