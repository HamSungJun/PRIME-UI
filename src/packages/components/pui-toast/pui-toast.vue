<template>
    <div class="wrapper">
        <pui-button
          v-for="direction in directions"
          :key="direction"
          :type="'primary'"
          outline
          @click="showToast(direction)"
        >
          {{direction}}
        </pui-button>
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
.wrapper{
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
}
</style>
