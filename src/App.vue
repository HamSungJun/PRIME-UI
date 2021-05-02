<template>
  <div id="app">
    <pui-modal-container />
    <button @click="createModal">create</button>
  </div>
</template>

<script>
import Sample from '@/packages/components/Sample.vue'
export default {
  name: 'App',
  component: {
    Sample
  },
  data () {
    return {
      placements: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
      ]
    }
  },
  mounted () {
  },
  methods: {
    createModal () {
      this.$modal.show({
        modalComp: Sample
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
  flex-direction: column;
  .button{
    display: inline-block;
    width: 100px;
    height: 50px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
}
</style>
