<template>
  <div id="app">
    <div class="box">
      <pui-slider
        :border="true"
        :disabled="false"
        :use-step="true"
      >
      </pui-slider>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {

    }
  },
  methods: {

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
  .box{
    width: 500px;
    height: 60px;
  }
}
</style>
