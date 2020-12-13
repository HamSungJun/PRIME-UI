<template>
  <div id="app">
    <div>
      <pui-radio
        v-for="(theme, i) in ['default','primary','success', 'info', 'warning', 'danger']"
        :key="i"
        :type="theme"
        :label="theme"
        :value="radioValue"
        @change="onChange"
        border
        circle-rect
      >
      </pui-radio>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      radioValue: 'default'
    }
  },
  methods: {
    onClick (e) {
      console.log(e)
    },
    onChange (payload) {
      this.radioValue = payload.label
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
}
</style>
