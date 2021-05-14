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
    },
    methods: {
      createNode ({ nodeName }) {
        return {
          id: Math.random(),
          name: nodeName,
          children: []
        }
      },
      onCreateBefore ({ parentNode, currentNode, nodeName }) {
        if (!parentNode) return
        console.log(parentNode, currentNode, nodeName)
        const currentNodeIndex = parentNode.children.findIndex(node => node === currentNode)
        parentNode.children.splice(
          currentNodeIndex === 0 ? 0 : currentNodeIndex - 1,
          0,
          this.createNode({ nodeName })
        )
      },
      onCreateAfter ({ parentNode, currentNode, nodeName }) {
        if (!parentNode) return
        const currentNodeIndex = parentNode.children.findIndex(node => node === currentNode)
        parentNode.children.splice(
          currentNodeIndex + 1,
          0,
          this.createNode({ nodeName })
        )
      },
      onRemove () {

      },
      onUpdate () {

      }
    }
  })
}
