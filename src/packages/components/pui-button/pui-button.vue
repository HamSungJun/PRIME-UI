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
('default','#ffffff','#212121','#212121','#212121','#ffffff','#212121',),
('primary', '#ffffff', '#2979ff','transparent', '#2979ff', '#ffffff', '#2979ff'),
('info','#ffffff', '#9e9e9e', 'transparent', '#9e9e9e', '#ffffff', '#9e9e9e'),
('success', '#ffffff', '#00e676', 'transparent', '#00e676', '#ffffff', '#00e676'),
('warning', '#ffffff', '#ffb74d', 'transparent', '#ffb74d', '#ffffff', '#ffb74d'),
('danger', '#ffffff', '#f44336', 'transparent', '#f44336', '#ffffff', '#f44336');
$button-sizes:
('mini', '0.7rem', '0.85rem'),
('small', '0.8rem', '0.85rem'),
('medium', '0.9rem', '1rem'),
('default', '1rem 1rem', '1rem');
$button-shapes:
('rect','0px'),
('round', '22px');
$button-transitions: 'background 0.25s ease-in';
.pui-button {
  display: inline-block;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: 0.75rem;
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
    opacity: 0.60;
    pointer-events: none;
  }
}
</style>
