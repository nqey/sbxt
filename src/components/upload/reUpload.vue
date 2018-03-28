<template>
  <div class="pos">
     <div style="position:absolute; background-color: #716e7f; z-index: 999;width: 350px;height: 210px;opacity: 0.5">
     </div>
     <button class="btn js-ajax-submit" @click="fileClick">重新上传</button>
     <img :src="limgSrc" style="max-width: 100%;max-height: 100%;position: absolute;"></img>
     <div style="width: 18px;height: 18px;position: absolute;right: 0px;bottom: 0px;background-color: #646a7f;color: #fff;text-align: center;">
       <span  class="glyphicon glyphicon-resize-full" @click="bigImg"></span>
     </div>
     
     <input @change="fileChange($event)" type="file" :id="uploadid" multiple style="display: none"/>
  </div>
</template>

<script>

export default {
  name: 'reupload',
  props: ['uploadid', 'imgSrc'],
  data() {
    return {
      limgSrc: '',
    };
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
      };
      el.target.value = '';
    },
    bigImg() {
      // 发送事件
      this.$emit('clickbg', this.limgSrc);
    },
  },
  mounted() {
    this.limgSrc = this.imgSrc;
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.pos {
  position: relative;display: inline-block;
  width: 350px;height: 210px;
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
    width: 150px;
    margin: 27%;
    color:#fff;
    background: rgb(1, 200, 83);
    z-index: 1000;
    position: absolute;
}

</style>