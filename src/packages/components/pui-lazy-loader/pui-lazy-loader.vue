<template>
    <div :class="['pui-lazy-loader']">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'pui-lazy-loader',
  mounted () {
    console.dir(this.$slots)
  }
}
</script>

<style>

</style>
