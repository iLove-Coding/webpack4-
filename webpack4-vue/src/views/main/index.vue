<template>
  <div>
    主页
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted () {
    console.log(1) // eslint-disable-line
    console.log(process.env.NODE_ENV) // eslint-disable-line
  },
  methods: {
  }
}
</script>
