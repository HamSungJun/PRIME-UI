<template>
  <div id="app">
    <button class="button" v-for="(placement, i) in placements" :key="i" @click="printMe">{{placement}}</button>

  </div>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
      placements: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
      ]
    }
  },
  mounted () {
    console.log(this.$toast)
  },
  methods: {
    printMe () {
      this.$toast.createToasts([
        {
          message: '프라임 UI 토스트를 생성하였습니다.',
          type: 'warning'
        }
      ])
    }
  }
}
</script>

<style lang="scss">
#app{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .button{
    display: inline-block;
    width: 100px;
    height: 50px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
}
</style>
