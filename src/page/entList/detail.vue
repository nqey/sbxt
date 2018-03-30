<template>
  <div>
    <v-head></v-head>
    <v-lmenu></v-lmenu>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;企业详情</span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height">企业全称：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <p class="label_height">四川新中华搜信息技术有限公司</p>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">企业负责人：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <p class="label_height">企业负责人XXX</p>
        </div>
        <v-bigimg v-if="showImg" @hideViewImg="viewImg" :imgSrc="imgSrc"></v-bigimg>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">手机号码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <p class="label_height">手机号码XXXX</p>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">身份证号码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <p class="label_height">身份证号码XXXX</p>
        </div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">身份证照片：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
        </div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">营业执照：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
        </div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">生产许可证：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
        </div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
        </div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业负责人尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
        </div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业入库申请函：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
        </div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">授权委托书：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
        </div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">其他补充材料：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vhead from '@/components/header';
import lmenu from '@/components/leftMenu';
import upload from '@/components/upload';
import bigImg from '@/components/bigImg';
import abm from '@/assets/img/abm.jpg';
import jze from '@/assets/img/jze.jpg';
import commonimg from '@/components/commonImg';

export default {
  name: 'search',
  data() {
    return {
      abm,
      jze,
      showImg: false,
    };
  },
  methods: {
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
  },
  components: {
    'v-head': vhead,
    'v-lmenu': lmenu,
    'v-upload': upload,
    'v-bigimg': bigImg,
    'v-commonimg': commonimg,
  },
};
</script>

<style lang="scss" scoped>

.bs-example {
    position: relative;
    top: 120px;
    left: 275px;
    margin: 0;
    width: 84%;
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 35px 30px;
    position: relative;
}
.t_nav {
  border-left: #4786ff solid 3px;
  margin-left: -30px;
  /*font-weight: bold;*/
  font-size: 18px;
}
a {
  text-decoration: none;
}
.txr {
  text-align: right;
}
.txc {
  text-align: center;
}
.iw {
  width: 300px;
}
.iw600 {
  width: 600px;
}
.label_height {
  line-height: 35px;
}
.imb {
  margin-bottom: 30px;
}
.info {
  color: #ac2925;
}
.areafc {
  color: #999;
}
.js-ajax-submit {
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>
