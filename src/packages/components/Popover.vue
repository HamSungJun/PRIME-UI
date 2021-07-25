<template>
  <div class="pui-popover-sample" @mouseenter="onMouseEnter">
      <div class="pui-popover-header">
          <h1>This is Sample.</h1>
      </div>
      <div class="pui-popover-body">
          <pui-button :type="'primary'" outline @click="onClose">close</pui-button>
          <pui-button :type="'primary'" outline @click="onCloseAll">closeAll</pui-button>
      </div>
  </div>
</template>

<script>
import Popover from './Popover.vue'
export default {
  name: 'popover',
  methods: {
    onClose () {
      this.$emit('close')
    },
    onCloseAll () {
      this.$emit('close-all')
    },
    onMouseEnter (event) {
      this.$popover.open({
        source: event.target,
        popoverComp: Popover,
        popoverOptions: {
          placement: 'Bottom-Center',
          useStack: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pui-popover-sample{
    width: 200px;
    height: 200px;
    border: 2px dashed cornflowerblue;
    .pui-popover-header{
      text-align: center;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .pui-popover-body{

    }
  }
</style>
