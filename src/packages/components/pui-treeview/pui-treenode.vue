<template>
    <div :style="treeNodeStyle" :class="['pui-tree-node']">
        <span>{{treeData.name}}</span>
    </div>
</template>

<script>
export default {
  name: 'pui-treenode',
  props: {
    treeData: {
      type: Object,
      required: true
    },
    treeLevel: {
      type: Number,
      required: true
    },
    treeLevelGap: {
      type: Number,
      required: true
    }
  },
  computed: {
    treeNodeStyle () {
      const { treeLevel, treeLevelGap } = this
      return {
        paddingLeft: `${treeLevel * treeLevelGap}px`
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.pui-tree-node{
    display: flex;
    height: 30px;
    align-items: center;
}
</style>
