<template>
  <div class="pos">
     <img :src="imgSrc" style="max-width: 100%;max-height: 100%;top:0;position: absolute;"></img>
     <div style="width: 18px;height: 18px;position: absolute;right: 0px;bottom: 0px;background-color: #646a7f;color: #fff;text-align: center;">
     	<span  class="glyphicon glyphicon-resize-full" @click="bigImg"></span>
     </div>
  </div>
</template>
<script>

export default {
  name: 'commonImg',
  props: ['imgSrc'],

  methods: {
    bigImg() {
      // 发送事件
      this.$emit('acceptImgSrc', this.imgSrc);
    },
  },
};

</script>
<style scoped>
.pos {
	position: relative;display: inline-block;width: 350px;height: 210px;
}
</style>