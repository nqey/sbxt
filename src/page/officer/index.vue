<template>
  <div>
    <v-errinfo :errMsg="errMsg"></v-errinfo>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;添加申报官</span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height"><span class="info">*</span> 姓 名：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600" placeholder="请输入申报官真实姓名" v-model="name">
        </div>
        <v-bigimg v-if="showImg" @hideViewImg="viewImg" :imgSrc="imgSrc"></v-bigimg>
        <div class="form-group col-sm-1 txr">
            <label class="label_height"><span class="info">*</span> 手机号码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600" placeholder="请输入手机号码" v-model="cellphone">
    		<br/>
    		<br/>
    		&#12288;<small class="areafc">该手机号必须是申报官真实手机号码，每一个手机号码只能添加一名申报官。</small>
    		<br/>
    		<br/>
    		    <input type="text" class="form-control iw" placeholder="请输入验证码" v-model="code"></input>
            <button class="btn hqyzm">获取验证码</button>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height"><span class="info">*</span> 寸 照：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <p class="label_height areafc">请按照示例图拍摄，蓝底、正装寸照；将照片上传至此；支持格式：bmp、jpg、png、gif。 </p>
            <p class="areafc">照片大小不超过2M。</p>
            <small class="info label_height">请上传本人真实照，审核会与身份证进行对比，不按照要求上传会导致审核通不过。</small>
            <br/>
            <br/>
            <v-idcardupload text="上传寸照" @acceptImgSrc="bigimg" @acceptData="setPortrait" uploadid="upload1"></v-idcardupload>
         </div>
         <div class="form-group col-sm-1 txr">
                <label class="label_height"><span class="info">*</span> 身份证号码：</label>
         </div>
	     <div class="form-group col-sm-11 imb">
	            <input type="text" class="form-control iw600" placeholder="请输入身份证号码" v-model="idNumber">
	    		<br/>
	    		<br/>
	    		&#12288;<small class="areafc">申报官真实有效身份证号码，每一个身份证号只能添加一名申报官。</small>
	      </div>
	      <div class="form-group col-sm-1 txr">
            <label class="label_height">身份证照片：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <small class="info2 label_height">请按照示例上传证件照片；支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <p></p>
            <small class="info label_height">请上传本人真实身份证，否则审核不通过。</small>
            <div class="clearfix"></div>
            <v-idcardupload uploadid="upload2" text="上传正面" @acceptData="frontUrl"></v-idcardupload>
            <v-idcardupload uploadid="upload3" text="上传背面" @acceptData="backUrl"></v-idcardupload>
        </div>
          <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 尽职调查表：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height"><b>下载</b> <a>尽职调查表</a></p>
            <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <br/>
            <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
            <br/>
            <br/>
            <v-upload @acceptImgSrc="bigimg" @acceptData="setSurveyImageUrl" uploadid="upload4"></v-upload>
          </div>
          <div class="form-group col-sm-1 txr">
              <label class="label_height"><span class="info">*</span> 承诺公函：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <p class="label_height"><b>下载</b> <a>承诺公函</a></p>
            <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <br/>
            <small class="info label_height">请上传完整的承诺公函</small>
            <br/>
            <br/>
            <v-idcardupload text="上传图片" @acceptImgSrc="bigimg" @acceptData="setLetterImageUrl" uploadid="upload5"></v-idcardupload>
          </div>
          <div class="form-group col-sm-1 txr">
          </div>
          <div class="form-group col-sm-11 imb">
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
import bigImg from '@/components/bigImg';
import errInfo from '@/components/errInfo';
import rules from '@/config/rules';
// { DECLARE_GET_BASEINFO } from '@/config/env';

export default {
  name: 'search',
  data() {
    return {
      name: '',
      cellphone: '',
      code: '',
      portrait: '',
      idNumber: '',
      idFrontUrl: '',
      idBackUrl: '',
      surveyImageUrl: '',
      letterImageUrl: '',
      showImg: false,
      errMsg: [],
    };
  },
  methods: {
    validate() {
      this.errMsg = [];
      // 手机号码验证
      if (this.cellphone !== '' && !rules.mPattern.pattern.test(this.cellphone)) {
        this.errMsg.push(rules.mPattern.message);
      }
    },
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
    frontUrl(d) {
      this.idFrontUrl = d;
    },
    backUrl(d) {
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
    submit() {
      const obj = {};
      obj.name = this.name;
      obj.code = this.code;
      obj.cellphone = this.cellphone;
      obj.idNumber = this.idNumber;
      obj.idFrontUrl = this.idFrontUrl;
      obj.idBackUrl = this.idBackUrl;
      obj.surveyImageUrl = this.surveyImageUrl;
      obj.letterImageUrl = this.letterImageUrl;
      obj.portrait = this.portrait;
      this.$router.push('/officermsg');
      // console.log(this.obj);
    },
  },
  components: {
    'v-upload': upload,
    'v-bigimg': bigImg,
    'v-idcardupload': idcardupload,
    'v-errinfo': errInfo,
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
