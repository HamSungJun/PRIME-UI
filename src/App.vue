<template>
  <div id="app">
    <div>
      <!-- <pui-radio
        v-for="(theme, i) in ['dark','blue','green', 'gray', 'orange', 'red']"
        :key="i"
        :theme="theme"
        :label="theme"
        :select-value="radioValue"
        :radio-shape="'rect'"
        @change="onChange"
        :border="true"
      >
      </pui-radio> -->
      <pui-checkbox
        v-for="({theme, checked, label}, i) in checkboxItems"
        :key="i"
        :index="i"
        :theme="theme"
        :checked="checked"
        :label="label"
        border
        @change="onChange"
      >
      </pui-checkbox>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      radioValue: 'default',
      checkboxItems: [
        { theme: 'dark', label: 'Pui-CheckBox', checked: false },
        { theme: 'blue', label: 'Pui-CheckBox', checked: true },
        { theme: 'green', label: 'Pui-CheckBox', checked: false },
        { theme: 'gray', label: 'Pui-CheckBox', checked: false },
        { theme: 'orange', label: 'Pui-CheckBox', checked: false },
        { theme: 'red', label: 'Pui-CheckBox', checked: false }
      ]
    }
  },
  methods: {
    onClick (e) {
      console.log(e)
    },
    onChange (payload) {
      this.checkboxItems[payload.index].checked = !this.checkboxItems[payload.index].checked
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
