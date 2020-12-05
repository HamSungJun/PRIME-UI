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
    <i v-if="icon && iconPlacement === 'left'" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
    <i v-if="icon && iconPlacement === 'right'" :class="icon"></i>
  </div>
</template>

<script>
export default {
  name: 'pui-button',
  props: {
    rect: {
      type: Boolean,
      required: false
    },
    round: {
      type: Boolean,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    iconPlacement: {
      type: String,
      default: 'left',
      required: false
    },
    outline: {
      type: Boolean,
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
      required: false
    }
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
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
