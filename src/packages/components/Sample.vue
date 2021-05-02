<template>
  <div class="pui-modal-sample">
      <div class="pui-modal-header">
          <h1>This is Sample.</h1>
      </div>
      <div class="pui-modal-body">
          <div class="image-box">
            <img src="https://cdn.britannica.com/84/206384-131-207CC735/Javan-gliding-tree-frog.jpg" alt="">
          </div>
          <p>개구리는 귀엽지만 만지고 눈을 만지면 더이상 귀엽지 않습니다.</p>
          <pui-button :type="'primary'" outline @click="onCreate">create</pui-button>
          <pui-button :type="'primary'" outline @click="onClose">close</pui-button>
          <pui-button :type="'primary'" outline @click="onCloseAll">closeAll</pui-button>
      </div>
  </div>
</template>

<script>
import Sample from './Sample.vue'
export default {
  name: 'sample',
  methods: {
    onCreate () {
      this.$modal.show({
        modalComp: Sample,
        modalOptions: {
          useStack: true
        }
      })
    },
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
  .pui-modal-sample{
    width: 600px;
    height: auto;
    padding: 20px;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 4px 4px #272c34;
    .pui-modal-header{
      text-align: center;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .pui-modal-body{
      text-align: center;
      p{
        margin: 20px 0;
      }
      .image-box{
        height: 400px;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
</style>
