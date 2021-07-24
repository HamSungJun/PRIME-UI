<template>
  <div id="app">
    <pui-popover-container></pui-popover-container>
    <button v-for="(p,i) in placements" :key="i" class="source" @mouseenter="onClick($event,p)" @mouseleave="onLeave">{{p}}</button>
  </div>
</template>

<script>
import Popover from '@/packages/components/Popover.vue'
import { PUI_VALID_PLACEMENTS } from './packages/constants'
export default {
  name: 'App',
  data () {
    return {
      placements: [...PUI_VALID_PLACEMENTS]
    }
  },
  methods: {
    onClick (event, placement) {
      this.$popover.open({
        source: event.target,
        popoverComp: Popover,
        popoverOptions: {
          placement,
          animationDuration: 0.35
        }
      })
    },
    onLeave (event) {
      this.$popover.closeAll()
    }
  }
}
</script>

<style lang="scss">
#app{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  .button{
    display: inline-block;
    width: 100px;
    height: 50px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .box{
    border: 1px dashed #ccc;
    width: 600px;
    height: 1000px;
    overflow: auto;
    padding: 20px;
  }
  .source {
    border: 1px dashed blue;
    width: 100px;
    height: 100px;
    transform: translate(-50%,-50%);
  }
  .target {
    transition: all 1s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px dashed red;
    width: 100px;
    height: 100px;
    position: absolute;
    font-size: 10px;
  }
  .btn {
    cursor: pointer;
    position: fixed;
    z-index: 0;
  }
  input {
    border: 1px solid #ccc;
  }
}
</style>
