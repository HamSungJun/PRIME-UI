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
            'pui-tree-fold',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
            {'pui-tree-node__item-status--visible': isInternalNode},
            {'pui-tree-node__item-status--Invisible': !isInternalNode}
          ]"
        >
          <font-awesome-icon
            :class="[{'rotate-180': !treeFold}]"
            :icon="['fas', 'caret-down']"
          />
        </span>
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
          v-if="treeNodeCreateBefore && treeDataParent"
          :class="[
            'pui-tree-node-create-before',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          <font-awesome-icon
            :icon="['fas', 'arrow-circle-up']"
          />
        </span>
        <span
          v-if="treeNodeCreateAfter && treeDataParent"
          :class="[
            'pui-tree-node-create-after',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          <font-awesome-icon
            :icon="['fas', 'arrow-circle-up']"
            rotation="180"
          />
        </span>
        <span
          v-if="treeNodeAppend"
          :class="[
            'pui-tree-node-append',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          <font-awesome-icon
            :icon="['fas', 'plus-circle']"
          />
        </span>
        <span
          v-if="treeNodeRemove && treeDataParent"
          :class="[
            'pui-tree-node-remove',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          <font-awesome-icon
            :icon="['fas', 'trash-alt']"
          />
        </span>
        <span
          v-if="treeNodeUpdate"
          :class="[
            'pui-tree-node-update',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
        >
          <font-awesome-icon
            :icon="['fas', 'pencil-alt']"
          />
        </span>
        <span
          v-if="treeNodeMove && treeDataParent"
          :class="[
            'pui-tree-node-move',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
            'pui-tree-node__item-function-icon--handle',
          ]"
          ref="node-handle"
        >
          <font-awesome-icon
            :icon="['fas', 'grip-vertical']"
          />
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
    treeDataParent: {
      type: [Object, null],
      default: () => null,
      required: false
    },
    treeFold: {
      type: Boolean,
      required: true
    },
    treeNodeDefaultName: {
      type: String,
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
    treeNodeAppend: {
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
    },
    isInternalNode () {
      return this.treeData.children.length > 0
    }
  },
  mounted () {
    console.log(this.treeData)
  },
  methods: {
    onMouseDown (event) {
      if (!event.target.closest('.pui-tree-node__item-function-icon--handle')) {
        event.preventDefault()
      }
      return true
    },
    onNodeClick (event) {
      const functionClass = event.target.closest('.pui-tree-node__item')?.classList.item(0)
      if (this.treeBus.nodeFunctionSet.has(functionClass)) {
        switch (functionClass) {
          case 'pui-tree-node-create-before':
            return this.treeBus.onCreateBefore({
              parentNode: this.treeDataParent,
              currentNode: this.treeData,
              nodeName: this.treeNodeDefaultName
            })
          case 'pui-tree-node-create-after':
            return this.treeBus.onCreateAfter({
              parentNode: this.treeDataParent,
              currentNode: this.treeData,
              nodeName: this.treeNodeDefaultName
            })
          case 'pui-tree-node-append':
            return this.treeBus.onAppend({
              currentNode: this.treeData,
              nodeName: this.treeNodeDefaultName
            })
          case 'pui-tree-node-remove':
            return this.treeBus.onRemove({
              parentNode: this.treeDataParent,
              currentNode: this.treeData
            })
        }
      } else {
        switch (functionClass) {
          case 'pui-tree-fold':
            return this.$emit('tree-fold')
        }
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
  &__item{
    &-name{
      font-size: 1.25rem;
      margin-right: auto;
    }
    &-function-icon{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 1.15rem;
      text-decoration: underline;
      cursor: pointer;
      padding: 0 5px;
      min-width: 35px;
      color: rgba(40,40,40,0.5);
      transition: color 0.25s ease;
      &:hover{
        color: rgb(30,30,30);
        background-color: rgba(220,220,220,0.75);
      }
      svg {
        transition: transform 0.25s ease;
      }
    }
    &-status--visible{
      visibility: visible;
    }
    &-status--Invisible{
      visibility: hidden;
    }
  }
}
</style>
