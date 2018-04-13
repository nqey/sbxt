<template>
  <div class="hello">
    <v-big-img v-if="isShowBigImg" :imgSrc="bigImgUrl" @hideBigImg="closeBigImg"></v-big-img>
    <div class="upload_warp_img" v-show="imgRes.length!=0">
      <div class="upload_warp_img_div" v-for="(url, index) of imgRes">
        <div class="upload_warp_img_div_top">
          <img :src="del" class="upload_warp_img_div_del" @click="fileDel(index)">
        </div>
        <div class="upload_warp_img_div_bottom"  @click="showBigImg(url)">
          <span class="glyphicon glyphicon-resize-full" style="top: -39px;"></span>
        </div>
        <img :src="serverurl + url" >
      </div>
    </div>
    <div class="upload_warp" v-show="imgRes.length < len">
      <div class="upload_warp_left" @click="fileClick">
        <img :src="upload">
        <p style="line-height: 75px;">{{title}}</p>
      </div>
    </div>
    <input @change="fileChange($event)" type="file" :id="uploadid" multiple style="display: none"/>
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
      imgRes: [],
    };
  },
  methods: {
    fileClick() {
      document.getElementById(this.uploadid).click();
    },
    fileChange(el) {
      // 判断文件是否存在
      if (!el.target.files[0].size) return;
      const file = el.target.files[0];
      // 判断是否为图片文件
      if (file.type.indexOf('image') === -1) return;
      this.upFile(file);
      el.target.value = '';
    },
    async upFile(file) {
      const param = new FormData();
      param.append('fileList', file);
      const res = await this.$xhr('upload', DECLARE_POST_UPLOAD, param);
      if (this.imgRes.length >= this.len) {
        this.imgRes.splice(0, 1);
      }
      this.imgRes.push(res.data.data[0]);
      this.$emit('acceptData', this.imgRes.join(','));
    },
    fileDel(index) {
      this.imgRes.splice(index, 1);
      this.$emit('acceptData', this.imgRes);
    },
    showBigImg(url) {
      this.bigImgUrl = this.serverurl + url;
      this.isShowBigImg = true;
    },
    closeBigImg() {
      this.isShowBigImg = false;
    },
    setImgSrc() {
      if (this.imgSrc) {
        this.imgRes = this.imgSrc.split(',');
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

.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_bottom {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  background-color: #646a7f;
  color: #fff;
  text-align: center;
  z-index: 999;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  max-width: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  width: 200px;
  margin: 0px 30px 10px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}

.upload_warp_img {
  /*border-top: 1px solid #D2D2D2;*/
  /*padding: 14px 0 0 14px;*/
  overflow: hidden;
  float: left;
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 10px;
  padding-top: 10px;
  text-indent: 14px;
  border-top: 1px solid #ccc;
  font-size: 14px;
}

.upload_warp_right {
  float: left;
  width: 57%;
  margin-left: 2%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  line-height: 130px;
  color: #999;
}

.upload_warp_left img {
  margin-top: 40px;
}

.upload_warp_left {
  float: left;
  width: 200px;
  height: 200px;
  border: 1px dashed #999;
  border-radius: 4px;
  cursor: pointer;
  color: #999;
}

.upload_warp {
  /*margin: 14px;*/
  height: 130px;
}

.upload {
  border: 1px solid #ccc;
  background-color: #fff;
  width: 650px;
  box-shadow: 0px 1px 0px #ccc;
  border-radius: 4px;
}

.hello {
  width: 800px;
  text-align: center;
}
</style>