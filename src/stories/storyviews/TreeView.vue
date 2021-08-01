<template>
  <div id="app">
    <pui-tooltip-container></pui-tooltip-container>
    <div class="box">
       <pui-treeview v-bind="$props"></pui-treeview>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeView',
  props: [
    'treeBus',
    'treeData',
    'treeDataParent',
    'treeFold',
    'treeLevel',
    'treeMaxLevel',
    'treeLevelGap',
    'treeNodeCreateBefore',
    'treeNodeCreateAfter',
    'treeNodeAppend',
    'treeNodeRemove',
    'treeNodeUpdate',
    'treeNodeMove',
    'treeNodeDefaultName'
  ]
}
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 700px;
  min-height: 700px;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  .box{
    border: 1px dashed #ccc;
    width: 75%;
    min-height: 100%;
    max-height: 100%;
    overflow: auto;
    padding: 20px;
  }
}
</style>
