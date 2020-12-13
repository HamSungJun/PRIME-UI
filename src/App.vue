<template>
  <div id="app">
    <div>
      <pui-radio
        v-for="(theme, i) in ['default','primary','success', 'info', 'warning', 'danger']"
        :key="i"
        :type="theme"
        label="안녕하세요"
        @change="onChange"
        border
        >
        </pui-radio>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    onClick (e) {
      console.log(e)
    },
    onChange (payload) {
      console.log(payload)
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
