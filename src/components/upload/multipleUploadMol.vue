<template>
  <div class="hello">
    <v-big-img v-if="isShowBigImg" :imgSrc="bigImgUrl" @hideBigImg="closeBigImg"></v-big-img>
    <div class="upload_warp_img" v-show="viewImgs.length!=0">
      <div class="upload_warp_img_div" v-for="(url, index) of viewImgs" :style="{ 'margin-bottom': (len>1 ? 10 : 0) + 'px' }">
        <span v-if="len > 1" class="upload_warp_img_div_top el-icon-error" @click="fileDel(index)"></span>
        <span v-if="len > 1" class="upload_warp_img_div_bottom el-icon-zoom-in" @click="showBigImg(url)"></span>
        <span v-if="len <= 1" class="upload_warp_img_div_top el-icon-zoom-in" @click="showBigImg(url)"></span>
        <img :src="url" @click="fileClick">
      </div>
    </div>
    <div class="upload_warp" v-show="viewImgs.length < len">
      <div class="upload_warp_left" @click="fileClick">
        <img :src="upload">
        <p style="line-height: 75px;">{{title}}</p>
      </div>
    </div>
    <input @change="fileChange($event)" type="file" :id="uploadid" multiple style="display: none" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"/>
  </div>
</template>

<script>
import del from '@/assets/img/del.png';
import upload from '@/assets/img/upload.png';
import { DECLARE_POST_UPLOAD, IMAGE_SERVER_URL } from '@/config/env';
import vBigImg from '@/components/img/bigImg';

export default {
  name: 'upload',
  props: ['uploadid', 'len', 'imgSrc', 'title'],
  data() {
    return {
      del,
      upload,
      serverurl: IMAGE_SERVER_URL,
      bigImgUrl: '',
      isShowBigImg: false,
      viewImgs: [],
      acceptData: [],
      loading: null,
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
      // 判断文件是否存在
      if (!el.target.files[0].size) return;
      const file = el.target.files[0];
      this.loading = this.$loading({
        lock: true,
        text: '',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        target: el.target.parentNode,
      });
      // 判断是否为图片文件
      if (file.type.indexOf('image') === -1) return;
      this.upFile(file);
      el.target.value = '';
    },
    async upFile(file) {
      const param = new FormData();
      param.append('fileList', file);
      const res = await this.$http.upload(DECLARE_POST_UPLOAD, param);
      if (res.success) {
        if (this.viewImgs.length >= this.len) {
          this.viewImgs.splice(0, 1);
          this.acceptData.splice(0, 1);
        }
        const url = res.data[0].match('?') ? `${this.serverurl}${res.data[0]}?q=10` : `${this.serverurl}${res.data[0]}&q=10`;
        this.viewImgs.push(url);
        this.acceptData.push(res.data[0]);
        this.$emit('acceptData', this.acceptData.join(','));
        this.loading.close();
      }
    },
    fileDel(index) {
      this.viewImgs.splice(index, 1);
      this.acceptData.splice(index, 1);
      this.$emit('acceptData', this.acceptData.length === 0 ? '' : this.acceptData.join(','));
    },
    showBigImg(url) {
      this.bigImgUrl = url.replace('?q=10', '');
      this.isShowBigImg = true;
    },
    closeBigImg() {
      this.isShowBigImg = false;
    },
    setImgSrc() {
      if (this.imgSrc) {
        this.viewImgs = [this.imgSrc];
      }
    },
  },
  components: {
    'v-big-img': vBigImg,
  },
  mounted() {
    this.setImgSrc();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.hello {
  text-align: center;
  width: 175px;
  /*height: 175px;*/
}
.upload_warp_img {
  border: 1px dashed #dcdfe6;
}
.upload_warp_img_div {
  position: relative;
}
.upload_warp_img_div_top {
  position: absolute;
  top: -14px;
  right: -9px;
  width: 24px;
  height: 24px;
  line-height: 30px;
  text-align: left;
  font-size: 12px;
  text-indent: 4px;
  border-radius: 12px;
  font-size: 20px;
}
/*.el-upload-list__item-status-label {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
}*/
.upload_warp_img_div_del {
  position: absolute;
  top: 5px;
  width: 16px;
  right: 4px;
}
.upload_warp_img_div_bottom {
  position: absolute;
  top: -14px;
  left: -15px;
  width: 24px;
  height: 24px;
  line-height: 30px;
  text-align: left;
  font-size: 12px;
  text-indent: 4px;
  border-radius: 12px;
  font-size: 20px;
}
.iii {top: 0px;}
.upload_warp {
  border: 1px dashed #dcdfe6;
}
.upload_warp_left {
}
.upload_warp_left img {
  margin-top: 20px;
}
</style>