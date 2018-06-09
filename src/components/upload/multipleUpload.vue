<template>
  <div class="hello">
    <v-big-img v-if="isShowBigImg" :imgSrc="bigImgUrl" @hideBigImg="closeBigImg"></v-big-img>
    <div class="upload_warp_img" v-show="imgRes.length!=0">
      <div class="upload_warp_img_div" v-for="(url, index) of imgRes">
        <div class="upload_warp_img_div_top">
          <img :src="del" class="upload_warp_img_div_del" @click="fileDel(index)">
        </div>
        <div class="upload_warp_img_div_bottom"  @click="showBigImg(url)">
          <span class="glyphicon glyphicon-resize-full iii"></span>
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
      imgRes: [],
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
      this.$emit('acceptData', this.imgRes.length === 0 ? '' : this.imgRes.join(','));
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
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

@media (max-width: 768px) {
  .hello {
    text-align: center;
  }
  .upload_warp_img {
    border: 1px solid #dcdfe6;
  }
  .upload_warp_img_div {
    position: relative;
    margin-bottom: 10px;
  }
  .upload_warp_img_div_top {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 24px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
    border-radius: 12px;
  }
  .upload_warp_img_div_del {
    position: absolute;
    top: 5px;
    width: 16px;
    right: 4px;
  }
  .upload_warp_img_div_bottom {
    display: none;
  }
  .iii {top: 0px;}
  .upload_warp {
    border: 1px solid #dcdfe6;
    height: 300px;
  }
  .upload_warp_left {
  }
  .upload_warp_left img {
    margin-top: 100px;
  }
}
@media (min-width: 992px) {
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

  .hello {
    width: auto;
    text-align: center;
  }
  .upload_warp_img {
    overflow: hidden;
    float: left;
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
    /*z-index: 999;*/
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
  .upload_warp_left img {
    margin-top: 40px;
  }
  .upload_warp_left {
    float: left;
    width: 200px;
    height: 200px;
    border: 1px solid #e6e3e3;
      border-radius: 4px;
      cursor: pointer;
      color: #d0cbcb;
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
  .iii {top: -39px;}
}
</style>