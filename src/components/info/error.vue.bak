<template>
  <div v-show="this.errMsg.length > 0" class="alert alert-danger errMsg" role="alert">
    <p v-for="item of errMsg"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>&#12288;{{item}}</p>
  </div>
</template>
<script>

export default {
  name: 'errInfo',
  props: ['errMsg'],
  methods: {
    close() {
      this.errMsg = [];
    },
  },
};

</script>
<style scoped>
.errMsg{
  position: fixed;
  top: 20px;
  margin: 0 25%;
  text-align: center;
  z-index: 1000;
  width: 50%;
}
</style>