<template>
    <div class="pui-modal">
        <div class="pui-modal-content">
            <component :is="modalComp" v-bind="modalProps" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'pui-modal',
  props: {
    modalComp: {
      type: Object,
      required: true
    },
    modalProps: {
      type: Object,
      required: false,
      default: () => {}
    },
    modalOptions: {
      type: Object,
      required: false,
      default: () => {}
    },
    modalHandlers: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
}
</script>

<style>

</style>
