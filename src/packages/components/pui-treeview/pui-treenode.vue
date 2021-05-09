<template>
    <div
      :style="treeNodeStyle"
      :class="['pui-tree-node']"
      :draggable="isDraggable"
      @mousedown="onMouseDown"
      @click="onNodeClick"
    >
        <span
          :class="[
            'pui-tree-node__item',
            'pui-tree-node__item-name'
          ]"
          :title="treeData.name"
        >
          {{treeData.name}}
        </span>
        <span
          v-if="treeNodeCreateBefore"
          :class="[
            'pui-tree-node-create-before',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          Insert Before
        </span>
        <span
          v-if="treeNodeCreateAfter"
          :class="[
            'pui-tree-node-create-after',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          Insert After
        </span>
        <span
          v-if="treeNodeRemove"
          :class="[
            'pui-tree-node-remove',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          Remove
        </span>
        <span
          v-if="treeNodeUpdate"
          :class="[
            'pui-tree-node-update',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          Edit
        </span>
        <span
          v-if="treeNodeMove"
          :class="[
            'pui-tree-node-move',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
            'pui-tree-node__item-function-icon--handle',
          ]"
        >
          Move
        </span>
    </div>
</template>

<script>
export default {
  name: 'pui-treenode',
  props: {
    treeBus: {
      type: Object,
      required: true
    },
    treeData: {
      type: Object,
      required: true
    },
    treeLevel: {
      type: Number,
      required: true
    },
    treeMaxLevel: {
      type: Number,
      required: true
    },
    treeLevelGap: {
      type: Number,
      required: true
    },
    treeNodeCreateBefore: {
      type: Boolean,
      required: true
    },
    treeNodeCreateAfter: {
      type: Boolean,
      required: true
    },
    treeNodeRemove: {
      type: Boolean,
      required: true
    },
    treeNodeUpdate: {
      type: Boolean,
      required: true
    },
    treeNodeMove: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      nodeFunctions: [
        'insert-before',
        'insert-after',
        'remove',
        'update'
      ]
    }
  },
  computed: {
    treeNodeStyle () {
      const { treeLevel, treeLevelGap } = this
      return {
        paddingLeft: `${treeLevel * treeLevelGap}px`
      }
    },
    isDraggable () {
      return this.treeNodeMove
    }
  },
  mounted () {
    console.log(this.treeData)
  },
  methods: {
    onMouseDown (event) {
      if (!event.target.classList.contains('pui-tree-node-move')) {
        event.preventDefault()
      }
      return true
    },
    onNodeClick (event) {
      const functionClass = event.target.classList.item(0)
      if (this.treeBus.nodeFunctionSet.has(functionClass)) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pui-tree-node{
  display: flex;
  width: 100%;
  height: 30px;
  margin: 2px 0;
  align-items: center;
  &:hover{
    border: 1px dashed #ccc;
  }
  &__item{
    &-name{
    font-size: 1.25rem;
    }
    &-function-icon{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 0.75rem;
      text-decoration: underline;
      cursor: pointer;
      padding: 0 10px;
      &:hover{
        background: #ccc;
      }
    }
    &--handle{
      margin-left: auto;
    }
  }
}
</style>
