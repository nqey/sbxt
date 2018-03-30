<template>
  <div style="float: left;margin-right: 15px;">
    <div class="hello">
      <div>
        <div class="upload_warp_img" v-show="showImg">
            <div class="upload_warp_img_div" @click="fileClick">
              <img :src="imgSrc" >
            </div>
        </div>
        <div class="upload_warp" v-show="!showImg">
          <div class="upload_warp_left" @click="fileClick">
            <img :src="upload">
            <p style="line-height: 75px;">{{text}}</p>
          </div>
        </div>
        <input @change="fileChange($event)" type="file" :id="uploadid" multiple style="display: none"/>
      </div>
    </div>
  </div>
</template>

<script>
import upload from '@/assets/img/upload.png';
import { DECLARE_POST_UPLOAD } from '@/config/env';


export default {
  name: 'upload',
  props: ['uploadid', 'text', 'imgUrl'],
  data() {
    return {
      upload,
      file: {},
      showImg: false,
      imgSrc: '',
    };
  },
  methods: {
    fileClick() {
      document.getElementById(this.uploadid).click();
    },
    async upFile(file) {
      const param = new FormData();
      param.append('fileList', file);
      const res = await this.$xhr('upload', DECLARE_POST_UPLOAD, param);
      this.$emit('acceptData', res.data.data[0]);
    },
    async fileChange(el) {
      if (!el.target.files[0].size) return;
      if (el.target.files[0].type === '') return;
      const reader = new FileReader();
      reader.readAsDataURL(el.target.files[0]);
      reader.onload = (e) => {
        this.imgSrc = e.target.result;
        this.showImg = true;
      };
      this.upFile(el.target.files[0]);
      el.target.value = '';
    },
  },
  mounted() {
    if (this.imgUrl) {
      this.imgSrc = this.imgUrl;
      this.showImg = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';

.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  height: 200px;
  width: 200px;
  margin: 0px 30px 10px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
}
.upload_warp_img {
  overflow: hidden;
}


.upload_warp_left img {
  margin-top: 40px;
}

.upload_warp_left {
  width: 200px;
  height: 200px;
  border: 1px dashed #999;
  border-radius: 4px;
  cursor: pointer;
  color: #999;
}

.upload_warp {
  height: 200px;
}

.hello {
  width: 200px;
  text-align: center;
}
</style>