<template>
  <div id="app">
    <div>
      <pui-radio
        v-for="(theme, i) in ['dark','blue','green', 'gray', 'orange', 'red']"
        :key="i"
        :theme="theme"
        :label="theme"
        :select-value="radioValue"
        :radio-shape="'rect'"
        @change="onChange"
        :border="true"
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
