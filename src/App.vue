<template>
  <div id="app">
    <pui-treeview :treeData="treeData" />
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
      treeData: {
        id: 0,
        name: 'new node',
        children: [
          {
            id: 1,
            name: 'new node',
            children: [
              {
                id: 3,
                name: 'new node',
                children: []
              },
              {
                id: 4,
                name: 'new node',
                children: []
              }
            ]
          },
          {
            id: 2,
            name: 'new node',
            children: []
          }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {

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
