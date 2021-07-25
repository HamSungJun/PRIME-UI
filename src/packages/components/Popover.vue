<template>
  <div class="pui-popover-sample">
      <div class="pui-popover-item">Item 1</div>
      <div class="pui-popover-item">Item 2</div>
      <div class="pui-popover-item">Item 3</div>
      <section class="pui-popover-footer">
        <pui-button @click="onClose" outline :size="'mini'" :type="'warning'">Close</pui-button>
        <pui-button @click="onClose" outline :size="'mini'" :type="'primary'">Save</pui-button>
      </section>
  </div>
</template>

<script>
export default {
  name: 'popover',
  methods: {
    onClose () {
      this.$emit('close')
    },
    onCloseAll () {
      this.$emit('close-all')
    }
  }
}
</script>

<style lang="scss" scoped>
  .pui-popover-sample{
    padding: 20px;
    width: 200px;
    height: auto;
    background-color: white;
    box-shadow: 0px 2px 4px #ccc;
    border-radius: 2px;
    overflow: hidden;
   .pui-popover-item {
     display: flex;
     align-items: center;
     justify-content: flex-start;
     height: 40px;
     padding: 10px 20px;
     &:hover {
       background-color: papayawhip;
       color: salmon;
     }
     &:not(:last-child){
       border-bottom: 1px solid papayawhip;
     }
   }
   .pui-popover-footer {
     text-align: center;
     margin-top: 20px;
   }
  }
</style>
