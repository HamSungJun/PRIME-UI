<template>
    <div :class="['pui-tree']">
        <pui-treenode
            :tree-bus="treeBus"
            :tree-data="treeData"
            :tree-level="treeLevel"
            :tree-max-level="treeMaxLevel"
            :tree-level-gap="treeLevelGap"
            :tree-node-create-before="treeNodeCreateBefore"
            :tree-node-create-after="treeNodeCreateAfter"
            :tree-node-remove="treeNodeRemove"
            :tree-node-update="treeNodeUpdate"
            :tree-node-move="treeNodeMove"
            @click="onNodeClick"
        />
        <pui-treeview
            v-for="_treeData in treeData.children"
            :key="_treeData.id"
            :tree-bus="treeBus"
            :tree-data="_treeData"
            :tree-data-parent="treeData"
            :tree-level="treeLevel + 1"
            :tree-max-level="treeMaxLevel"
            :tree-level-gap="treeLevelGap"
            :tree-node-create-before="treeNodeCreateBefore"
            :tree-node-create-after="treeNodeCreateAfter"
            :tree-node-remove="treeNodeRemove"
            :tree-node-update="treeNodeUpdate"
            :tree-node-move="treeNodeMove"
        />
    </div>
</template>

<script>
import PuiTreeNode from './pui-treenode'
import { PUI_TREE_BUS } from './pui-treebus'
export default {
  name: 'pui-treeview',
  components: {
    'pui-treenode': PuiTreeNode
  },
  props: {
    treeBus: {
      type: Object,
      default: () => PUI_TREE_BUS(),
      required: false
    },
    treeData: {
      type: Object,
      required: true
    },
    treeDataParent: {
      type: [Object, null],
      default: () => null,
      required: false
    },
    treeLevel: {
      type: Number,
      default: 0,
      required: false
    },
    treeMaxLevel: {
      type: Number,
      default: 5,
      required: false
    },
    treeLevelGap: {
      type: Number,
      default: 20,
      required: false
    },
    treeNodeCreateBefore: {
      type: Boolean,
      default: true,
      required: false
    },
    treeNodeCreateAfter: {
      type: Boolean,
      default: true,
      required: false
    },
    treeNodeRemove: {
      type: Boolean,
      default: true,
      required: false
    },
    treeNodeUpdate: {
      type: Boolean,
      default: true,
      required: false
    },
    treeNodeMove: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods: {
    onNodeClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.pui-tree{

}
</style>
