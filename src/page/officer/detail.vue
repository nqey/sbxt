<template>
  <div class="bs-example">
    <span class="t_nav">&#12288;申报官详情</span>
    <br/>
    <br/>
    <br/>
    <div class="form-inline clearfix">
      <div class="form-group col-sm-1 txr clearfix">
        <v-portrait-img :imgSrc="portrait"></v-portrait-img>
      </div>
      <div class="form-group col-sm-11 imb">
        <span class="label_height"> 用户名：&#12288;{{name}}&#12288;&#12288;</span>
        <br/>
        <span class="label_height">手机号码：{{cellphone}}&#12288;&#12288;</span>
        <br/>
        <span class="label_height">所在区域：{{area}}&#12288;&#12288;</span>
        <br/>
        <span class="label_height"> 身份证号：{{idNumber}}&#12288;&#12288;</span>
        &#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;考试分数：<span class="cscore">{{score}}</span></span>
      </div>
      <br/>
      <br/>
      <div class="form-group col-sm-1 txr clearfix">
        <label class="label_height">证件照片：</label>
      </div>
      <div class="form-group col-sm-11 imb">
        <div class="pull-left" style="width: 200px;margin-right: 30px;">
          <v-img :imgSrc="idFrontUrl"></v-img>
        </div>
        <div class="pull-left" style="width: 200px;">
          <v-img :imgSrc="idBackUrl"></v-img>
        </div>
      </div>
      <br/>
      <div class="form-group col-sm-1 txr clearfix">
        <label class="label_height">尽职调查表：</label>
      </div>
      <div class="form-group col-sm-11 imb">
        <div class="pull-left" v-for="url of surveyImageUrls">
          <v-img :imgSrc="url"></v-img>
        </div>
      </div>
      <br/>
      <div class="form-group col-sm-1 txr clearfix">
        <label class="label_height">承诺公函：</label>
      </div>
      <div class="form-group col-sm-11 imb">
        <v-img :imgSrc="letterImageUrl"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
import vimg from '@/components/img/img';
import vPortraitImg from '@/components/img/portraitImg';
import { DECLARE_GET_DECLARER_DETAILS } from '@/config/env';

export default {
  name: 'officerDetail',
  data() {
    return {
      name: '',
      cellphone: '',
      idNumber: '',
      reason: '',
      score: 0,
      portrait: '',
      idFrontUrl: '',
      idBackUrl: '',
      surveyImageUrl: '',
      surveyImageUrls: [],
      letterImageUrl: '',
      liveAddress: '',
      state: '',
      area: '',
      areaCode: '',
      errMsg: [],
      infoTimer: null,
    };
  },
  methods: {
    async init() {
      const res = await this.$xhr('get', `${DECLARE_GET_DECLARER_DETAILS}${this.$route.params.id}`);
      if (res.data.code === 0) {
        this.name = res.data.data.name;
        this.cellphone = res.data.data.cellphone;
        this.idNumber = res.data.data.idNumber;
        this.reason = res.data.data.reason;
        if (this.reason) {
          this.errMsg.push(this.reason);
        }
        if (res.data.data.score === -1) {
          this.score = '未考试';
        } else {
          this.score = `${res.data.data.score}分`;
        }
        this.portrait = res.data.data.portrait;
        this.idFrontUrl = res.data.data.idFrontUrl;
        this.idBackUrl = res.data.data.idBackUrl;
        this.surveyImageUrl = res.data.data.surveyImageUrl;
        if (res.data.data.surveyImageUrl) {
          this.surveyImageUrls = res.data.data.surveyImageUrl.split(',');
        }
        this.areaCode = `${res.data.data.proviceCode},${res.data.data.cityCode},${res.data.data.areaCode}`;
        this.letterImageUrl = res.data.data.letterImageUrl;
        this.area = `${res.data.data.provice}-${res.data.data.city}-${res.data.data.district}`;
      }
    },
  },
  components: {
    'v-img': vimg,
    'v-portrait-img': vPortraitImg,
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.err {
  color: #ac2925;
}
.cscore {
  color: green;font-size: 18px;
}
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