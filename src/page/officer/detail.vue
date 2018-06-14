<template>
 <div class="index_more">
  <v-error-info :errMsg="errMsg"></v-error-info>
  <div class="index_chunk">
    <div class="t_nav">&#12288;申报官详情</div>
    <hr>
    <div class="form-inline clearfix">
      <div class="clearfix">
      <div class="form-group col-sm-2 txr">
        <v-portrait-img :imgSrc="portrait"></v-portrait-img>
      </div>
      <div class="col-sm-1"></div>
      <div class="form-group col-sm-9 imb clearfix">
        <h3 class="label_height"> {{name}}</h3>
        <p class="label_height">手机号码：<span>{{cellphone}}</span></p>
        <p class="label_height">所在区域：<span>{{area}}</span></p>
        <p class="label_height pull-left"> 身份证号：<span>{{idNumber}}</span></p>
        <p class="pull-right">考试分数：<span class="cscore">{{score}}</span></p>
      </div>
    </div>
      <br/>
      <br/>
      <div class="form-group col-sm-2 txr clearfix">
        <label class="label_height">证件照片：</label>
      </div>
      <div class="form-group col-sm-10 imb">
        <div class="pull-left" style="width: 200px;margin-right: 30px;">
          <v-img :imgSrc="idFrontUrl"></v-img>
        </div>
        <div class="pull-left" style="width: 200px;">
          <v-img :imgSrc="idBackUrl"></v-img>
        </div>
      </div>
      <br/>
      <div class="form-group col-sm-2 txr clearfix">
        <label class="label_height">尽职调查表：</label>
      </div>
      <div class="form-group col-sm-10 imb">
        <div class="pull-left" v-for="url of surveyImageUrls">
          <v-img :imgSrc="url"></v-img>
        </div>
      </div>
      <br/>
      <div class="form-group col-sm-2 txr clearfix">
        <label class="label_height">承诺公函：</label>
      </div>
      <div class="form-group col-sm-10 imb">
        <v-img :imgSrc="letterImageUrl"></v-img>
      </div>
      <div class="form-group col-sm-2 txr clearfix">
        <label class="label_height">二维码：</label>
      </div>
      <div class="form-group col-sm-10 imb">
        <img :src="qrCode"></img>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import vimg from '@/components/img/img';
import vPortraitImg from '@/components/img/portraitImg';
import { DECLARE_GET_DECLARER_DETAILS, DECLARE_QCODE } from '@/config/env';
import errInfo from '@/components/info/error';

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
      qrCode: '',
    };
  },
  methods: {
    async init() {
      const res = await this.$http.get(`${DECLARE_GET_DECLARER_DETAILS}${this.$route.params.id}`);
      if (res.success) {
        this.name = res.data.name;
        this.cellphone = res.data.cellphone;
        this.idNumber = res.data.idNumber;
        this.reason = res.data.reason;
        if (this.reason) {
          this.errMsg.push(this.reason);
        }
        if (res.data.score === -1) {
          this.score = '未考试';
        } else {
          this.score = `${res.data.score}分`;
        }
        this.portrait = res.data.portrait;
        this.idFrontUrl = res.data.idFrontUrl;
        this.idBackUrl = res.data.idBackUrl;
        this.surveyImageUrl = res.data.surveyImageUrl;
        if (res.data.surveyImageUrl) {
          this.surveyImageUrls = res.data.surveyImageUrl.split(',');
        }
        this.areaCode = `${res.data.proviceCode},${res.data.cityCode},${res.data.areaCode}`;
        this.letterImageUrl = res.data.letterImageUrl;
        this.area = res.data.district;
        this.qrCode = `${DECLARE_QCODE}?id=${this.$route.params.id}`;
      }
    },
  },
  components: {
    'v-img': vimg,
    'v-portrait-img': vPortraitImg,
    'v-error-info': errInfo,
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
  color: #00c853;font-size: 16px;
  font-weight: bold;
}
.index_more{background: #f6f7fb;
  height: 100%;
  padding-bottom: 200px;
    width: 100%;}
.index_chunk{ 
position: relative;
top:120px;
left: 19%;
margin: 0;
width: 78%;background:#fff; padding: 40px 70px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}

.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}
a {
  text-decoration: none;
}
.txr {
  text-align: center;
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
  h3{margin-bottom: 15px;}
  p{color: #505050;}
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