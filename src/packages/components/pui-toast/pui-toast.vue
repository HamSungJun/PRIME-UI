<template>
    <div>
        <button class="toast-button" v-for="direction in directions" :key="direction" @click="showToast(direction)">{{direction}}</button>
    </div>
</template>
<script>
export default {
  name: 'pui-toast',
  data () {
    return {
      directions: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
      ],
      types: [
        'success',
        'info',
        'error',
        'warning'
      ],
      messages: [
        'Pui-Button',
        'Pui-Checkbox',
        'Pui-Radio',
        'Pui-Slider',
        'Pui-Toast'
      ]
    }
  },
  methods: {
    showToast (direction) {
      this.shuffle(this.types)
      this.shuffle(this.messages)
      this.$toast.createToasts([
        {
          message: this.messages[0],
          type: this.types[0],
          direction
        }
      ])
    },
    shuffle (arr) {
      const arrLen = arr.length
      for (let i = 0; i < 10; i++) {
        const i = Math.floor(Math.random() * arrLen)
        const j = Math.floor(Math.random() * arrLen)
        this.swap(i, j, arr)
      }
    },
    swap (i, j, arr) {
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
  }
}
</script>
<style lang="scss" scoped>
.toast-button{
    display: block;
    width: 50%;
    margin: 0 auto;
    border: 1px dashed #ccc;
    height: 50px;
    cursor: pointer;
    &:not(:last-child){
        margin-bottom: 10px;
    }
    &:hover{
        background-color: lightgoldenrodyellow;
    }
}
</style>
