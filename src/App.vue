<template>
  <div id="app">
    <div class="box">
      <pui-slider
        v-for="(theme, i) in ['dark','blue','green','orange','red','gray']"
        :key="i"
        :theme="theme"
        :border="true"
        :disabled="false"
        :use-step="true"
        :min="1"
        :max="100"
        :value="25"
        :use-throttle="true"
        :use-wheel="true"
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
