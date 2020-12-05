<template>
  <div id="app">
    <div>
      <pui-button
        v-for="(type, i) in ['default', 'primary', 'success', 'info', 'warning', 'danger']"
        :key="i"
        :type="type"
      >
        안녕하세요
      </pui-button>
      <pui-button
        v-for="(type, i) in ['default', 'primary', 'success', 'info', 'warning', 'danger']"
        :key="i+6"
        :type="type"
        :outline="true"

      >
        안녕하세요
      </pui-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
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
}
</style>
