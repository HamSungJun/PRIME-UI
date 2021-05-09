import Vue from 'vue'

export const PUI_TREE_BUS = function () {
  return new Vue({
    name: 'pui-treebus',
    data () {
      return {
        nodeFunctionSet: new Set([
          'pui-tree-node-create-before',
          'pui-tree-node-create-after',
          'pui-tree-node-remove',
          'pui-tree-node-update'
        ])
      }
    }
  })
}
