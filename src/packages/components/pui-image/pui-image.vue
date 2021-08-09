<template>
  <img v-if="isLoad" v-bind="validProps">
</template>

<script>
export default {
  name: 'pui-image',
  props: {
    src: {
      type: String,
      default: '',
      required: false
    },
    alt: {
      type: String,
      default: '',
      required: false
    },
    width: {
      type: [Number, String],
      default: '',
      required: false
    },
    height: {
      type: [Number, String],
      default: '',
      required: false
    },
    loading: {
      type: String,
      default: 'eager',
      validator (v) {
        return ['eager', 'lazy'].includes(v.toLowerCase())
      }
    },
    longdesc: {
      type: String,
      default: '',
      required: false
    },
    crossorigin: {
      type: String,
      default: '',
      validator (v) {
        return ['anonymous', 'use-credentials'].includes(v.toLowerCase())
      }
    },
    referrerpolicy: {
      type: String,
      default: '',
      validator (v) {
        return [
          'origin',
          'unsafe-url',
          'same-origin',
          'no-referrer',
          'strict-origin',
          'origin-when-cross-origin',
          'no-referrer-when-downgrade',
          'strict-origin-when-cross-origin'
        ].includes(v.toLowerCase())
      }
    },
    usemap: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      isLoad: true
    }
  },
  computed: {
    validProps () {
      const { src, alt, width, height, loading, longdesc, crossorigin, referrerpolicy, usemap } = this
      const { isLoadingAvailable } = this
      return {
        ...(src && { src }),
        ...({ alt }),
        ...(width && { width }),
        ...(height && { height }),
        ...(usemap && { usemap }),
        ...(longdesc && { longdesc }),
        ...(crossorigin && { crossorigin }),
        ...(isLoadingAvailable && { loading }),
        ...(referrerpolicy && { referrerpolicy })
      }
    },
    isLoadingAvailable () {
      return 'loading' in HTMLImageElement.prototype
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style>

</style>
