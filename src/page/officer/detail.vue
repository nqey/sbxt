<template>
  <div>
    <v-errinfo :errMsg="errMsg"></v-errinfo>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;申报官详情</span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <div v-show="$route.params.type === '1'">
            <img :src="picPortrait"></img>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-reupload2 :imgSrc="portrait" @acceptImgSrc="bigimg" @acceptData="setPortrait" uploadid="up11"></v-reupload2>
          </div>
        </div>
        <div class="form-group col-sm-11 imb">
            <div v-show="isShowName">
              <span class="label_height"> 用户名：{{name}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editName"></span>
            </div>
            <div v-show="!isShowName">
              用户名：<input type="text" class="form-control iw"  placeholder="请输入用户名" v-model="name">
              <span class="glyphicon glyphicon-floppy-saved" @click="editName"></span>
            </div>
            <br/>
            <div v-show="isShowtell">
              <span class="label_height">手机号码：{{cellphone}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editTell"></span>
            </div>
            <div v-show="!isShowtell">
              手机号码：<input type="text" class="form-control iw"  placeholder="请输入手机号码" @blur="validate" v-model="cellphone">
              <span class="glyphicon glyphicon-floppy-saved" @click="editTell"></span>
            </div>
            <br/>
            <span class="label_height">所在区域：{{area}}&#12288;&#12288;</span>
            <br/>
            <br/>
            <span v-show="isShowNumber">
              <span class="label_height"> 身份证号：{{idNumber}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editNumber"></span>
            </span>
            <span v-show="!isShowNumber">
              身份证号：<input type="text" class="form-control iw"  placeholder="请输入身份证号" @blur="validate" v-model="idNumber">
              <span class="glyphicon glyphicon-floppy-saved" @click="editNumber"></span>
            </span>
            &#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;考试分数：<span class="cscore">{{score}}</span></span>
        </div>
        <div class="clearfix"></div>
        <br/>
        <br/>
        <v-bigimg v-if="showImg" @hideViewImg="viewImg" :imgSrc="imgSrc"></v-bigimg>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">证件照片：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="idFrontUrl" @acceptImgSrc="bigimg"></v-commonimg>
            <v-commonimg :imgSrc="idBackUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-idcardupload :imgUrl="idFrontUrl" @acceptImgSrc="bigimg" @acceptData="setFrontUrl" uploadid="up1"></v-idcardupload>
            <v-idcardupload :imgUrl="idBackUrl" @acceptImgSrc="bigimg" @acceptData="setBackUrl" uploadid="up2"></v-idcardupload>
          </div>
        </div>
        <div class="clearfix"></div>
        <br/>
          <div class="form-group col-sm-1 txr">
              <label class="label_height">尽职调查表：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <div v-show="$route.params.type === '1'">
              <v-commonimg :imgSrc="surveyImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
            </div>
            <div v-show="$route.params.type === '2'">
              <v-upload len="3" :imgUrl="surveyImageUrl" @acceptImgSrc="bigimg" @acceptData="setSurveyImageUrl" uploadid="up3"></v-upload>
            </div>
          </div>
        <div class="clearfix"></div>
        <br/>
          <div class="form-group col-sm-1 txr">
              <label class="label_height">承诺公函：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <div v-show="$route.params.type === '1'">
              <v-commonimg :imgSrc="letterImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
            </div>
            <div v-show="$route.params.type === '2'">
              <v-idcardupload :imgUrl="letterImageUrl" @acceptImgSrc="bigimg"  @acceptData="setLetterImageUrl" uploadid="up4"></v-idcardupload>
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="form-group col-sm-1 txr" v-show="$route.params.type === '2'">
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
import upload from '@/components/upload';
import idcardupload from '@/components/upload/idCardUpload';
import reupload2 from '@/components/upload/reUpload2';
import bigImg from '@/components/bigImg';
import commonimg from '@/components/commonImg';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';
import { DECLARE_GET_DECLARER_DETAILS, IMAGE_SERVER_URL, DECLARE_PUT_DECLARER } from '@/config/env';

export default {
  name: 'officerDetail',
  data() {
    return {
      showImg: false,
      name: '',
      cellphone: '',
      idNumber: '',
      reason: '',
      score: 0,
      portrait: '',
      picPortrait: '',
      idFrontUrl: '',
      idBackUrl: '',
      surveyImageUrl: '',
      letterImageUrl: '',
      state: '',
      area: '',
      isShowtell: true,
      isShowName: true,
      isShowNumber: true,
      errMsg: [],
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
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
    editTell() {
      this.isShowtell = !this.isShowtell;
    },
    editName() {
      this.isShowName = !this.isShowName;
    },
    editNumber() {
      this.isShowNumber = !this.isShowNumber;
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
        this.picPortrait = `${IMAGE_SERVER_URL}${res.data.data.portrait}`;
        this.portrait = res.data.data.portrait;
        this.idFrontUrl = res.data.data.idFrontUrl;
        this.idBackUrl = res.data.data.idBackUrl;
        this.surveyImageUrl = res.data.data.surveyImageUrl;
        this.letterImageUrl = res.data.data.letterImageUrl;
        this.area = `${res.data.data.provice}-${res.data.data.city}-${res.data.data.district}`;
      }
    },
    async submit() {
      this.validate2();
      if (this.errMsg.length !== 0) {
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
      const res = await this.$xhr('post', `${DECLARE_PUT_DECLARER}${this.$route.params.id}`, param);
      if (res.data.code === 0) {
        this.$router.push('/officer/list');
      }
    },
  },
  components: {
    'v-bigimg': bigImg,
    'v-commonimg': commonimg,
    'v-reupload2': reupload2,
    'v-errinfo': errInfo,
    'v-upload': upload,
    'v-idcardupload': idcardupload,
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