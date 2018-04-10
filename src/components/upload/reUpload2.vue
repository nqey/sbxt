<template>
  <div class="pos">
     <div style="position:absolute; background-color: #716e7f; z-index: 999;width: 120px;height: 110px;opacity: 0.5">
     </div>
     <button class="btn js-ajax-submit" style="left: 0;" @click="fileClick">重新上传</button>
     <img :src="limgSrc" style="max-width: 100%;max-height: 100%;position: absolute;left: 0;"></img>
     <div style="width: 18px;height: 18px;position: absolute;right: 0px;bottom: 0px;background-color: #646a7f;color: #fff;text-align: center;z-index: 999;">
       <span  class="glyphicon glyphicon-resize-full" @click="bigImg"></span>
     </div>
     <input @change="fileChange($event)" type="file" :id="uploadid" multiple style="display: none"/>
  </div>
</template>

<script>
import { DECLARE_POST_UPLOAD, IMAGE_SERVER_URL } from '@/config/env';

export default {
  name: 'reupload',
  props: ['uploadid', 'imgSrc'],
  data() {
    return {
      limgSrc: '',
      isE: true,
    };
  },
  watch: {
    imgSrc: 'setImgSrc',
  },
  methods: {
    fileClick() {
      document.getElementById(this.uploadid).click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      if (el.target.files[0].type === '') return;
      const reader = new FileReader();
      reader.readAsDataURL(el.target.files[0]);
      reader.onload = (e) => {
        this.limgSrc = e.target.result;
        this.isE = false;
      };
      this.upFile(el.target.files[0]);
      el.target.value = '';
    },
    async upFile(file) {
      const param = new FormData();
      param.append('fileList', file);
      const res = await this.$xhr('upload', DECLARE_POST_UPLOAD, param);
      if (res.data.success) {
        this.$emit('acceptData', res.data.data[0]);
      }
    },
    bigImg() {
      // 发送事件
      this.$emit('acceptImgSrc', this.limgSrc);
    },
    setImgSrc() {
      if (this.imgSrc && this.isE) {
        this.limgSrc = `${IMAGE_SERVER_URL}${this.imgSrc}`;
      }
    },
  },
  mounted() {
    this.setImgSrc();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.pos {
  position: relative;display: inline-block;
  width: 120px;height: 110px;
}
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 25px;
    color: #fff;
    width: 180px;
    background-color: rgba(73,43,253,0);
    border-color: rgba(255,255,255,0.7);
}
.js-ajax-submit {
    width: 120px;
    margin-top: 28%;
    color:#fff;
    background: rgb(1, 200, 83);
    z-index: 1000;
    position: absolute;
}

</style>