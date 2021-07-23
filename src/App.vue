<template>
  <div id="app">
    <!-- <div class="box">
      <pui-treeview
        :tree-data="treeData"
        :tree-level-gap="20"
        :tree-fold="false"
        @click="onClick"
      />
    </div>
  </div> -->
  <div>
    <input v-model="positionX" type="text">
    <input v-model="positionY" type="text">
    <button @click="onPosition">position</button>
  </div>
    <div class="source" ref="source">

    </div>
    <div
    v-for="{damage, top, left, p} in placements"
     :key="p" :class="['target']"
     :data-placement="p" ref="target"
     :style="{top: top+'px', left: left+'px'}">
      <p>damage: {{damage}}</p>
      <p>top: {{top}}</p>
      <p>left: {{left}}</p>
    </div>
  </div>
</template>

<script>
import Sample from '@/packages/components/Sample.vue'
export default {
  name: 'App',
  component: {
    Sample
  },
  data () {
    return {
      treeData: {
        id: 0,
        name: 'new node',
        children: [
          {
            id: 1,
            name: 'new node',
            children: [
              {
                id: 3,
                name: 'new node',
                children: []
              },
              {
                id: 4,
                name: 'new node',
                children: []
              }
            ]
          },
          {
            id: 2,
            name: 'new node',
            children: []
          }
        ]
      },
      sourceTop: 500,
      sourceLeft: 500,
      isDragging: false,
      positionX: 0,
      positionY: 0,
      placements: [
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Top-Start'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Top-Center'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Top-End'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Left-Start'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Left-Center'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Left-End'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Right-Start'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Right-Center'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Right-End'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Bottom-Start'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Bottom-Center'
        },
        {
          damage: 0,
          top: 0,
          left: 0,
          p: 'Bottom-End'
        }
      ]
    }
  },
  mounted () {
    const source = this.$refs.source
    this.$refs.target.forEach((targetRef, i) => {
      const target = targetRef
      const placement = targetRef.dataset.placement
      const { damage, top, left } = this.$common.placeAt({ source, target, placement })
      this.placements[i].damage = damage
      this.placements[i].top = top
      this.placements[i].left = left
    })
  },
  computed: {

    sourceStyle () {
      return {
        top: `${this.sourceTop}px`,
        left: `${this.sourceLeft}px`
      }
    }
  },
  methods: {
    onClick (event) {
      console.log(event)
    },
    onPlaceAt () {
      const { source, target } = this.$refs
      const { damage, top, left } = this.$common.placeAt({ source, target, placement: 'Top-Start' })
      this.damage = damage
      this.top = top
      this.left = left
    },
    onDragStart (event) {
      this.isDragging = true
    },
    onDragMove (event) {
      if (!this.isDragging) return
      this.sourceTop += event.movementY
      this.sourceLeft += event.movementX
      this.onPlaceAt()
    },
    onDragEnd () {
      this.isDragging = false
    },
    onPosition () {
      this.sourceTop = +this.positionY
      this.sourceLeft = +this.positionX
      this.onPlaceAt()
    }
  }
}
</script>

<style lang="scss">
#app{
  width: 100vw;
  height: 100vh;
  position: relative;
  .button{
    display: inline-block;
    width: 100px;
    height: 50px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .box{
    border: 1px dashed #ccc;
    width: 600px;
    height: 1000px;
    overflow: auto;
    padding: 20px;
  }
  .source {
    border: 1px dashed blue;
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .target {
    transition: all 1s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px dashed red;
    width: 100px;
    height: 100px;
    position: absolute;
    font-size: 10px;
  }
  .btn {
    cursor: pointer;
    position: fixed;
    z-index: 0;
  }
  input {
    border: 1px solid #ccc;
  }
}
</style>
