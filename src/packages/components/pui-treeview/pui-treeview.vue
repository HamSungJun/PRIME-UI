<template>
    <div :class="['pui-tree']">
        <pui-treenode
            :treeData="treeData"
            :treeLevel="treeLevel"
            :treeLevelGap="treeLevelGap"
        />
        <pui-treeview
            v-for="treeData in treeData.children"
            :key="treeData.id"
            :treeData="treeData"
            :treeLevel="treeLevel + 1"
        />
    </div>
</template>

<script>
import PuiTreeNode from './pui-treenode'
export default {
  name: 'pui-treeview',
  components: {
    'pui-treenode': PuiTreeNode
  },
  props: {
    treeData: {
      type: Object,
      required: true
    },
    treeLevel: {
      type: Number,
      default: 0,
      required: false
    },
    treeLevelGap: {
      type: Number,
      default: 20,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.pui-tree{

}
</style>
