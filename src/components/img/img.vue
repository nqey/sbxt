<template>
  <div style="margin-right: 20px;">
    <v-big-img v-if="isShowBigImg" :imgSrc="serverurl+imgSrc" @hideBigImg="closeBigImg"></v-big-img>
    <div class="imgW">
       <img :src="serverurl+imgSrc"></img>
       <div class="resize">
       	<span  class="glyphicon glyphicon-resize-full" @click="showBigImg"></span>
       </div>
    </div>
  </div>
</template>
<script>
import { IMAGE_SERVER_URL } from '@/config/env';
import vBigImg from '@/components/img/bigImg';

export default {
  name: 'mimg',
  props: ['imgSrc'],
  data() {
    return {
      serverurl: IMAGE_SERVER_URL,
      isShowBigImg: false,
    };
  },
  components: {
    'v-big-img': vBigImg,
  },
  methods: {
    showBigImg() {
      this.isShowBigImg = true;
    },
    closeBigImg() {
      this.isShowBigImg = false;
    },
  },
};

</script>
<style lang="scss" scoped>
.imgW {
  width: 200px;position: relative;
  img {
    max-width: 100%;
  }
}
.resize {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  background-color: #646a7f;
  color: #fff;
  text-align: center;
}
</style>