<!-- App -->
<template>
  <div class="app">
    <div class="text">App vue is resolved</div>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  data () {
    return {}
  },

  components: {},

  computed: {},

  mounted () {
    console.log(1) // eslint-disable-line
    console.log(process.env.NODE_ENV) // eslint-disable-line
  },

  methods: {}
}
</script>