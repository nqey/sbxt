<template>
  <div>
    <v-registerhead :step="2"></v-registerhead>
    <div class="row">
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
          <div class="form-inline row clearfix">
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">姓 名：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input calss="iw" type="text" class="form-control" name="authCode" placeholder="请输入姓名">
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">身份证号码：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input calss="iw" type="text" class="form-control" name="authCode" placeholder="请输入身份证号码">
              </div>
              <v-imgenlarge v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></v-imgenlarge>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">身份证照片：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <v-upload @clickbg="enlarge"></v-upload>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">常住地址：</label>
              </div>
              <div class="col-sm-7 imb">
                  <v-geoarea></v-geoarea>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">推荐机构：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input calss="iw" type="text" class="form-control" name="authCode" placeholder="请输入推荐机构">
              </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import upload from '@/components/upload';
import geoarea from '@/components/geoArea';
import registerHead from '@/components/registerHead';
import imgenlarge from '@/components/imgEnlarge';

export default {
  name: 'step2',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      showImg: false,
      imgSrc: '',
    };
  },
  components: {
    'v-upload': upload,
    'v-geoarea': geoarea,
    'v-registerhead': registerHead,
    'v-imgenlarge': imgenlarge,
  },
  methods: {
    enlarge(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0px 55px;
}
.txr {
  text-align: right;
}
.iw {
  width: 300px;
}
.label_height {
  line-height: 35px;
}
.imb {
  margin-bottom: 30px;
}
.bs-example {
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: 15px 0;
    padding: 60px 30px;
    position: relative;
}
</style>