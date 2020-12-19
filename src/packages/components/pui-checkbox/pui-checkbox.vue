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
    @click.stop="onChange($event)"
  >
    <span
      :class="[
        'pui-checkbox__box',
        'pui-checkbox__box--shape-' + (boxShape || 'rect'),
        {
          'pui-checkbox__box--selected': checked
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
    customClass: {
      type: String,
      default: '',
      required: false
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
