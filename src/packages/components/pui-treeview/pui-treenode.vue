<template>
  <div
    :style="treeNodeStyle"
    :class="[
      'pui-tree-node',
      {
        'pui-tree-node-status--dragging': isDragging,
        'pui-tree-node-status--droppable': isDroppable && isDragEntered,
        'pui-tree-node-status--undroppable': !isDroppable && isDragEntered
      }
    ]"
    :draggable="isDraggable"
    @mousedown="onMouseDown"
    @click="onNodeClick"
    @dragstart="onNodeDragStart"
    @dragenter="onNodeDragEnter"
    @dragover.prevent
    @dragleave="onNodeDragLeave"
    @dragend="onNodeDragEnd"
    @drop.prevent="onNodeDrop"
    ref="pui-tree-node"
  >
    <span
      :class="[
        'pui-tree-fold',
        'pui-tree-node__item',
        'pui-tree-node__item-function-icon',
        {'pui-tree-node__item-status--visible': isInternalNode},
        {'pui-tree-node__item-status--invisible': !isInternalNode}
      ]"
    >
      <font-awesome-icon
        :class="[{'rotate-180': !treeFold}]"
        :icon="['fas', 'caret-down']"
      />
    </span>
    <span
      v-if="!isUpdating"
      :class="[
        'pui-tree-node__item',
        'pui-tree-node__item-name'
      ]"
      :title="treeData.name"
    >
      {{treeData.name}}
    </span>
    <input
      v-if="isUpdating"
      :class="[
        'pui-tree-node__item',
        'pui-tree-node__item-input'
      ]"
      type="text"
      :value="updateName"
      :spellcheck="false"
      @mousedown.stop
      @input="onNodeInput"
      @keyup.enter.stop="onNodeInputEnter"
      ref="pui-tree-node-input"
    >
      <div v-show="!isDragging" :class="[
        'pui-tree-node__item',
        'pui-tree-node__item-function-icon-container'
      ]">
        <span
          v-if="treeNodeCreateBefore && treeDataParent && !isUpdating"
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
          v-if="treeNodeCreateAfter && treeDataParent && !isUpdating"
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
          v-if="treeNodeAppend && !isUpdating"
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
          v-if="treeNodeRemove && treeDataParent && !isUpdating"
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
          v-if="treeNodeUpdate && !isUpdating"
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
          v-if="treeNodeUpdate && isUpdating"
          :class="[
            'pui-tree-node-update-end',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
          ]"
          ref="pui-tree-node-update-end"
        >
          <font-awesome-icon
            :icon="['fas', 'check']"
          />
        </span>
        <span
          v-if="treeNodeMove && treeDataParent && !isUpdating"
          :class="[
            'pui-tree-node-move',
            'pui-tree-node__item',
            'pui-tree-node__item-function-icon',
            'pui-tree-node__item-function-icon--handle',
          ]"
          ref="pui-tree-node-handle"
        >
          <font-awesome-icon
            :icon="['fas', 'grip-vertical']"
          />
        </span>
      </div>
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
      isUpdating: false,
      isDragging: false,
      isDragNode: false,
      isDroppable: false,
      isDragEntered: false,
      updateName: ''
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
  created () {
    this.treeBus.$on('drag-start', ({ dragNode }) => {
      if (dragNode !== this) {
        this.isDragging = true
        this.isDragNode = false
      } else {
        this.isDragNode = true
      }
    })
    this.treeBus.$on('drag-end', () => { this.isDragging = false })
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
          case 'pui-tree-node-update':
            this.updateName = this.treeData.name
            this.isUpdating = true
            this.$nextTick(() => { this.$refs['pui-tree-node-input'].focus() })
            break
          case 'pui-tree-node-update-end':
            if (this.updateName.length === 0) {
              return console.error('[pui-treeview] : 편집할 노드의 이름을 입력하세요.')
            }
            this.treeBus.onUpdate({
              currentNode: this.treeData,
              name: this.updateName
            })
            this.isUpdating = false
        }
      } else {
        switch (functionClass) {
          case 'pui-tree-fold':
            return this.$emit('tree-fold')
        }
      }
    },
    onNodeInput (event) {
      this.updateName = event.target.value
    },
    onNodeInputEnter () {
      this.$refs['pui-tree-node-update-end'].click()
    },
    onNodeDragStart () {
      this.treeBus.onDragStart({ dragNode: this })
    },
    onNodeDragEnter () {
      if (this.isDragNode) return
      this.isDragEntered = true
      this.isDroppable = this.treeBus.checkDroppable({
        dropNode: this
      })
    },
    onNodeDragLeave () {
      if (this.isDragNode) return
      this.isDragEntered = false
    },
    onNodeDragEnd () {
      this.treeBus.onDragEnd()
    },
    onNodeDrop () {
      this.isDragEntered = false
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
  padding-top: 2px;
  padding-bottom: 2px;
  &__item{
    &-name,
    &-input{
      font-size: 1rem;
      margin-right: auto;
    }
    &-name{
      @include text-ellipsis;
    }
    &-input{
      border: 1px dashed #ccc;
      padding-left: 5px;
      width: 100%;
      height: 100%;
    }
  }
  .pui-tree-node__item-function-icon-container{
    display: flex;
    height: 100%;
  }
  .pui-tree-node__item-function-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 1rem;
    text-decoration: underline;
    cursor: pointer;
    padding: 0 5px;
    min-width: 30px;
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
  &-status--dragging{
    border: 1px dashed#ccc;
  }
  &-status--droppable{
    background-color: $color-lightgreen3;
  }
  &-status--undroppable{
    background-color: $color-lightred3;
  }
  .pui-tree-node__item-status--visible{
    visibility: visible;
  }
  .pui-tree-node__item-status--invisible{
    visibility: hidden;
  }

}
</style>
