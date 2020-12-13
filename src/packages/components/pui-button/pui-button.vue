<template>
  <div
    :class="[
      'pui-button',
      type && !outline ? 'pui-button--type-' + type : '',
      type && outline ? 'pui-button--type-outline-' + type : '',
      size ? 'pui-button--size-' + size : '',
      {
        'pui-button--shape-rect': rect,
        'pui-button--shape-round': round,
        'pui-button--status-disabled': disabled
      },
      customClass ? customClass : ''
    ]"
    @click.stop="onClick"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'pui-button',
  props: {
    rect: {
      type: Boolean,
      default: false,
      required: false
    },
    round: {
      type: Boolean,
      default: false,
      required: false
    },
    outline: {
      type: Boolean,
      default: false,
      required: false
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
    eventRate: {
      type: Number,
      default: 144,
      required: false
    }
  },
  created () {
    this.onClick = this.$common.wrapThrottle(this.onClick, this.eventRate || undefined)
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
/**
 * PUI-BUTTON
 * $button-themes: ($type, $color, $background-color, $border-color, $outline-color, $outline-background-color, $outline-border-color)
 * $button-sizes: ($size, $padding, $fontsize)
 * $button-shapes: ($shape, $radius)
 */
$button-themes:
('default', '#ffffff', $color-default, $color-default, $color-default, '#ffffff', $color-default),
('primary', '#ffffff', $color-primary,'transparent', $color-primary, '#ffffff', $color-primary),
('info','#ffffff', $color-info, 'transparent', $color-info, '#ffffff', $color-info),
('success', '#ffffff', $color-success, 'transparent', $color-success, '#ffffff', $color-success),
('warning', '#ffffff', $color-warning, 'transparent', $color-warning, '#ffffff', $color-warning),
('danger', '#ffffff', $color-danger, 'transparent', $color-danger, '#ffffff', $color-danger);
$button-sizes:
('mini', $padding-mini, $fontsize-mini),
('small', $padding-small, $fontsize-small),
('medium', $padding-medium, $fontsize-medium),
('default', $padding-default, $fontsize-default);
$button-shapes:
('rect',$radius-rect),
('round', $radius-round);
$button-transitions: 'background 0.25s ease-in';
.pui-button {
  display: inline-block;
  border-width: 1px;
  border-style: solid;
  border-radius: $radius-default;
  cursor: pointer;
  transition: #{$button-transitions};

  span{
    display: inherit;
    transform: translateY(1px);
  }

  @each $type, $color, $background-color, $border-color, $outline-color, $outline-background-color, $outline-border-color in $button-themes{
    &.pui-button--type-#{$type}{
      color: #{$color};
      background-color: #{$background-color};
      border-color: #{$border-color};
    }
    &.pui-button--type-outline-#{$type}{
      color: #{$outline-color};
      background-color: #{$outline-background-color};
      border-color: #{$outline-border-color};
      &:hover{
        color: #ffffff;
        background-color: #{$outline-border-color};
      }
    }
  }

  @each $size, $padding, $fontsize in $button-sizes {
    &.pui-button--size-#{$size}{
      padding: #{$padding};
      font-size: #{$fontsize};
    }
  }

  @each $shape, $radius in $button-shapes {
    &.pui-button--shape-#{$shape}{
      border-radius: #{$radius};
    }
  }

  &.pui-button--status-disabled{
    @include status-disabled;
  }
}
</style>
