import Vue from 'vue'

export const PUI_TREE_BUS = function () {
  return new Vue({
    name: 'pui-treebus',
    data () {
      return {
        nodeFunctionSet: new Set([
          'pui-tree-node-create-before',
          'pui-tree-node-create-after',
          'pui-tree-node-append',
          'pui-tree-node-remove',
          'pui-tree-node-update',
          'pui-tree-node-update-end'
        ]),
        dragNode: null
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
      onAppend ({ currentNode, nodeName }) {
        currentNode.children.push(this.createNode({ nodeName }))
      },
      onRemove ({ parentNode, currentNode }) {
        if (!parentNode) return
        const currentNodeIndex = parentNode.children.findIndex(node => node === currentNode)
        parentNode.children.splice(
          currentNodeIndex,
          1
        )
      },
      onUpdate ({ currentNode, name }) {
        currentNode.name = name
      },
      onDragStart ({ dragNode }) {
        this.dragNode = dragNode
        this.$emit('drag-start', { dragNode })
      },
      onDrop ({ dropNode }) {
        const children = this.dragNode.treeDataParent.children
        const target = this.dragNode.treeData
        dropNode.treeData.children.push(target)
        children.splice(
          children.findIndex(ref => ref === target),
          1
        )
      },
      onDragEnd () {
        this.dragNode = null
        this.$emit('drag-end')
      },
      checkDroppable ({ dropNode }) {
        if (this.isDragNodeParentOfDropNode({ dragNode: this.dragNode, dropNode })) {
          return false
        }
        return true
      },
      isDragNodeParentOfDropNode ({ dragNode, dropNode }) {
        let nextParent = dropNode.$parent
        while (nextParent) {
          if (dragNode.$parent === nextParent) {
            return true
          }
          nextParent = nextParent.$parent
        }
        return false
      }
    }
  })
}
