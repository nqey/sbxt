<template>
  <div>
    <div class="pos" v-for="item of imgSrcs">
       <img :src="item" style="max-width: 100%;max-height: 100%;top:0;position: absolute;"></img>
       <div style="width: 18px;height: 18px;position: absolute;right: 0px;bottom: 0px;background-color: #646a7f;color: #fff;text-align: center;">
       	<span  class="glyphicon glyphicon-resize-full" @click="bigImg(item)"></span>
       </div>
    </div>
  </div>
</template>
<script>
import { IMAGE_SERVER_URL } from '@/config/env';

export default {
  name: 'commonImg',
  props: ['imgSrc'],
  methods: {
    bigImg(item) {
      // 发送事件
      this.$emit('acceptImgSrc', item);
    },
  },
  computed: {
    imgSrcs() {
      if (!this.imgSrc) {
        return '';
      }
      return this.imgSrc.split(',').map((o) => {
        const a = `${IMAGE_SERVER_URL}${o}`;
        return a;
      });
    },
  },
};

</script>
<style scoped>
.pos {
	position: relative;display: inline-block;width: 350px;height: 210px;margin-right: 10px;
}
</style>