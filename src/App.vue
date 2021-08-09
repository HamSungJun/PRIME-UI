<template>
  <div id="app">
    <pui-modal-container></pui-modal-container>
    <pui-popover-container></pui-popover-container>
    <pui-tooltip-container></pui-tooltip-container>
    <pui-lazy-loader>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <!-- <pui-image :src="'https://cdn.pixabay.com/photo/2021/08/04/10/21/lake-6521474__480.jpg'" :alt="'lake'" :width="300" :height="300"></pui-image> -->
          <img data-src="https://cdn.pixabay.com/photo/2021/08/04/10/21/lake-6521474__480.jpg" alt="">
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image  :src="'https://cdn.pixabay.com/photo/2021/08/04/10/21/lake-6521474__480.jpg'" :alt="'lake'" :width="300" :height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image src="https://cdn.pixabay.com/photo/2021/08/04/10/21/lake-6521474__480.jpg" alt="lake" width="300" height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image :src="'https://cdn.pixabay.com/photo/2021/07/05/19/38/scarlet-lily-beetle-6389888__480.jpg'" :alt="'lake2'" :width="300" :height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image :src="'https://cdn.pixabay.com/photo/2021/06/08/09/21/mountain-6320288__480.jpg'" alt="'lake3'" :width="300" :height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image :src="'https://cdn.pixabay.com/photo/2021/07/11/10/39/fantasy-6403406__480.jpg'" :alt="'lake4'" :width="300" :height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image :src="'https://cdn.pixabay.com/photo/2021/07/20/04/17/tasmanian-devil-6479685__480.jpg'" :alt="'lake'" :width="300" :height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image :src="'https://cdn.pixabay.com/photo/2021/07/18/14/59/family-6475821__480.jpg'" :alt="'lake'" :width="300" :height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image :src="'https://cdn.pixabay.com/photo/2021/08/02/16/22/beach-6517214__480.jpg'" :alt="'lake'" :width="300" :height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image :src="'https://cdn.pixabay.com/photo/2021/08/04/10/21/lake-6521474__480.jpg'" :alt="'lake'" :width="300" :height="300"></pui-image>
        </div>
      </div>
      <div class="image-card">
        <div><h3>Image</h3></div>
        <div>
          <pui-image :src="'https://cdn.pixabay.com/photo/2021/08/04/10/21/lake-6521474__480.jpg'" :alt="'lake'" :width="300" :height="300"></pui-image>
        </div>
      </div>
    </pui-lazy-loader>
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
  justify-content: center;
  flex-direction: row;
  .image-card{
    border: 1px solid #ccc;
    width: 400px;
    height: 400px;
    div:nth-child(1){
      height: 100px;
    }
    div:nth-child(2){
      height: 300px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
