<template>
    <div class="wrapper">
        <pui-tooltip-container></pui-tooltip-container>
        <div class="grid">
          <div v-for="(p, i) in placements" :key="i" class="grid-item" :class="p">
            <pui-button
              :type="'primary'"
              :custom-class="'btn-block'"
              outline
              block
              @mouseenter.native="showTooltip($event, p)"
            >
              {{p}}
            </pui-button>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'pui-tooltip',
  props: [
    'theme',
    'distance',
    'autoPlacement',
    'customStyle',
    'customClass',
    'showDelay',
    'hideDelay',
    'useStack',
    'useAnimation',
    'animationName',
    'animationDuration',
    'clickToClose',
    'resizeToClose',
    'scrollToClose'
  ],
  data () {
    return {
      placements: [
        'Top-Start', 'Top-Center', 'Top-End',
        'Bottom-Start', 'Bottom-Center', 'Bottom-End',
        'Left-Start', 'Left-Center', 'Left-End',
        'Right-Start', 'Right-Center', 'Right-End'
      ]
    }
  },
  methods: {
    showTooltip (event, placement) {
      this.$tooltip.show({
        source: event.target,
        textContent: 'This is Pui-Tooltip.',
        tooltipOptions: {
          placement,
          ...this.$props
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  .grid{
    display: grid;
    width: 50%;
    height: 50%;
    row-gap: 40px;
    column-gap: 40px;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    .grid-item{
      text-align: center;
    }
    .btn-block{
      display: block;
    }
  }
}
</style>
