<template>
  <div id="app">
    <pui-popover-container></pui-popover-container>
    <button class="source" @click="onClick">click</button>
  </div>
</template>

<script>
import Popover from '@/packages/components/Popover.vue'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    onClick (event) {
      this.$popover.open({
        source: event.target,
        popoverComp: Popover,
        popoverOptions: {
          placement: 'Bottom-Center'
        }
      })
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
    position: absolute;
    top: 50%;
    left: 50%;
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
