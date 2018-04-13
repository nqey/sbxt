<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div class="bs-example">
      <span class="t_nav">&#12288;申报官详情</span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr clearfix">
          <div v-if="$route.params.type === '1'">
            <v-portrait-img :imgSrc="portrait"></v-portrait-img>
          </div>
          <div v-if="$route.params.type === '2' && portrait">
            <v-portrait-upload len="1" title="上传头像" :imgSrc="portrait" @acceptData="setPortrait" uploadid="up11"></v-portrait-upload len="1">
          </div>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <span class="label_height"> 用户名：&#12288;{{name}}&#12288;&#12288;</span>
          </div>
          <div v-if="$route.params.type === '2'">
            用户名：&#12288;<input type="text" class="form-control iw"  placeholder="请输入用户名" v-model="name">
          </div>
          <br/>
          <div v-if="$route.params.type === '1'">
            <span class="label_height">手机号码：{{cellphone}}&#12288;&#12288;</span>
          </div>
          <div v-if="$route.params.type === '2'">
            手机号码：<input type="text" class="form-control iw"  placeholder="请输入手机号码" @blur="validate" v-model="cellphone">
          </div>
          <br/>
          <div v-if="$route.params.type === '1'">
            <span class="label_height">所在区域：{{area}}&#12288;&#12288;</span>
          </div>
          <div v-if="$route.params.type === '2'">
            <span class="label_height">所在区域：</span>
            <v-geo-area :areacode="areaCode" @acceptData="setLiveAddress"></v-geo-area>
          </div>
          <br/>
          <span v-if="$route.params.type === '1'">
            <span class="label_height"> 身份证号：{{idNumber}}&#12288;&#12288;</span>
          </span>
          <span v-if="$route.params.type === '2'">
            身份证号：<input type="text" class="form-control iw"  placeholder="请输入身份证号" @blur="validate" v-model="idNumber">
          </span>
          &#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;考试分数：<span class="cscore">{{score}}</span></span>
        </div>
        <br/>
        <br/>
        <div class="form-group col-sm-1 txr clearfix">
          <label class="label_height">证件照片：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <div v-if="idFrontUrl" class="pull-left" style="width: 200px;margin-right: 30px;">
              <v-img :imgSrc="idFrontUrl"></v-img>
            </div>
            <div v-if="idBackUrl" class="pull-left" style="width: 200px;">
              <v-img :imgSrc="idBackUrl"></v-img>
            </div>
          </div>
          <div v-show="$route.params.type === '2'">
            <div v-if="idFrontUrl" class="pull-left" style="width: 200px;margin-right: 30px;">
              <v-multiple-upload len="1" :imgSrc="idFrontUrl" uploadid="upload2" title="上传正面" @acceptData="setFrontUrl"></v-multiple-upload len="1">
            </div>
            <div v-if="idBackUrl" class="pull-left" style="width: 200px;">
              <v-multiple-upload len="1" :imgSrc="idBackUrl" uploadid="upload3" title="上传背面" @acceptData="setBackUrl"></v-multiple-upload len="1">
            </div>
          </div>
        </div>
        <br/>
        <div class="form-group col-sm-1 txr clearfix">
          <label class="label_height">尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <div class="pull-left" v-for="url of surveyImageUrls">
              <v-img :imgSrc="url"></v-img>
            </div>
          </div>
          <div v-show="$route.params.type === '2'" v-if="surveyImageUrls.length > 0">
            <v-multiple-upload len="3" :imgSrc="surveyImageUrl" title="上传调查表" @acceptData="setSurveyImageUrl" uploadid="up3"></v-multiple-upload>
          </div>
        </div>
        <br/>
        <div class="form-group col-sm-1 txr clearfix">
          <label class="label_height">承诺公函：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-img :imgSrc="letterImageUrl"></v-img>
          </div>
          <div v-show="$route.params.type === '2'"  v-if="letterImageUrl">
            <v-multiple-upload len="1" :imgSrc="letterImageUrl" title="上传承诺公函" @acceptData="setLetterImageUrl" uploadid="up4"></v-multiple-upload len="1">
          </div>
        </div>
        <div class="form-group col-sm-1 txr clearfix" v-show="$route.params.type === '2'">
        </div>
        <div class="form-group col-sm-11 imb" v-show="$route.params.type === '2'">
          <button @click="submit" class="btn js-ajax-submit">提交</button>
          <br/>
          <br/>
          <p class="areafc">&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#32;申报官信息需审核</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import multipleUpload from '@/components/upload/multipleUpload';
import portraitUpload from '@/components/upload/portraitUpload';
import vimg from '@/components/img/img';
import vPortraitImg from '@/components/img/portraitImg';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';
import { DECLARE_GET_DECLARER_DETAILS, DECLARE_PUT_DECLARER } from '@/config/env';
import vGeoArea from '@/components/reegionalCascade/geoArea';

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
    validate() {
      this.errMsg = [];
      // 手机号码验证
      if (this.cellphone && !rules.mPattern.pattern.test(this.cellphone)) {
        this.errMsg.push(rules.mPattern.message);
      }
      // 身份证号码
      if (this.idNumber && !rules.cP.pattern.test(this.idNumber)) {
        this.errMsg.push(rules.cP.message);
      }
    },
    validate2() {
      this.validate();
      // 手机号码验证
      if (!this.cellphone) {
        this.errMsg.push(`${rules.nonEmpty}${rules.phone}`);
      }
      // 姓 名
      if (!this.name) {
        this.errMsg.push(`${rules.nonEmpty}${rules.name}`);
      }
      //  寸 照
      if (!this.portrait) {
        this.errMsg.push(`${rules.nonEmpty}${rules.portrait}`);
      }
      //  身份证号码
      if (!this.idNumber) {
        this.errMsg.push(`${rules.nonEmpty}${rules.idNumber}`);
      }
      // 身份证照片正面
      if (!this.idFrontUrl) {
        this.errMsg.push(`${rules.upload}${rules.idFrontUrl}`);
      }
      // 身份证照片背面
      if (!this.idBackUrl) {
        this.errMsg.push(`${rules.upload}${rules.idBackUrl}`);
      }
      // 尽职调查表
      if (!this.surveyImageUrl) {
        this.errMsg.push(`${rules.upload}${rules.surveyImageUrl}`);
      }
      // 承诺公函
      if (!this.letterImageUrl) {
        this.errMsg.push(`${rules.upload}${rules.letterImageUrl}`);
      }
    },
    setFrontUrl(d) {
      this.idFrontUrl = d;
    },
    setBackUrl(d) {
      this.idBackUrl = d;
    },
    setPortrait(d) {
      this.portrait = d;
    },
    setSurveyImageUrl(d) {
      this.surveyImageUrl = d;
    },
    setLetterImageUrl(d) {
      this.letterImageUrl = d;
    },
    setLiveAddress(d) {
      this.areaCodes = d;
      this.liveAddress = d;
    },
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
    async submit() {
      this.validate2();
      if (this.errMsg.length !== 0) {
        clearTimeout(this.infoTimer);
        this.infoTimer = setTimeout(() => { this.errMsg = []; }, 3000);
        return;
      }
      const param = {};
      param.name = this.name;
      param.cellphone = this.cellphone;
      param.idNumber = this.idNumber;
      param.idFrontUrl = this.idFrontUrl;
      param.idBackUrl = this.idBackUrl;
      param.surveyImageUrl = this.surveyImageUrl;
      param.letterImageUrl = this.letterImageUrl;
      param.portrait = this.portrait;
      param.liveAddress = this.liveAddress;
      const res = await this.$xhr('post', `${DECLARE_PUT_DECLARER}${this.$route.params.id}`, param);
      if (res.data.code === 0) {
        sessionStorage.setItem('title', '更新申报官');
        sessionStorage.setItem('content', '更新申报官成功');
        sessionStorage.setItem('content2', '');
        sessionStorage.setItem('content3', '');
        sessionStorage.setItem('alink', '');
        sessionStorage.setItem('blink', '/officer/list');
        sessionStorage.setItem('clink', '');
        setTimeout(() => { this.$router.push('/message'); }, 1000);
      }
    },
  },
  components: {
    'v-img': vimg,
    'v-error-info': errInfo,
    'v-multiple-upload': multipleUpload,
    'v-portrait-upload': portraitUpload,
    'v-portrait-img': vPortraitImg,
    'v-geo-area': vGeoArea,
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