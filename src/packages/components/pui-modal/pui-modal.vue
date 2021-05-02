<template>
    <div class="wrapper">
        <pui-modal-container></pui-modal-container>
        <pui-button
          :type="'primary'"
          outline
          @click="showModal"
        >
          Create Modal
        </pui-button>
    </div>
</template>
<script>
import puiModalContainer from '../../prototypes/$modal/pui-modal-container.vue'
import Sample from '../Sample.vue'
export default {
  components: { puiModalContainer },
  name: 'pui-modal',
  methods: {
    showModal () {
      this.$modal.show({
        modalComp: Sample
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
