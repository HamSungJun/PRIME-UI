<template>
  <div id="app">
    <div class="box">
      <pui-treeview
        :tree-data="treeData"
        :tree-level-gap="20"
        @click="onClick"
      />
    </div>
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
    onClick (event) {
      console.log(event)
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
  .box{
    border: 1px dashed #ccc;
    width: 600px;
    height: 1000px;
    overflow: auto;
    padding: 20px;
  }
}
</style>
