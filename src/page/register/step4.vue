<template>
  <div>
    <v-registerhead :step="4"></v-registerhead>
    <v-errinfo :errMsg="errMsg"></v-errinfo>
    <div>
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
          <div class="form-inline  clearfix">
              <div class="form-group col-sm-12 txc imb">
                <h3>申请材料</h3>
                <br/>
              </div>
              <div class="form-group col-sm-4 txr">
                  <label class="label_height"><span class="info">*</span> 申报机构尽职调查表：</label>
              </div>
              <div class="form-group col-sm-8 imb">
                <p class="label_height"><b>下载</b> <a>尽职调查表</a></p>
                <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
                <br/>
                <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
                <br/>
                <br/>
                <v-upload len="3" :imgUrl="surveyImageUrl" @acceptImgSrc="bigimg" @acceptData="setSurveyImageUrl" uploadid="upload1"></v-upload>
              </div>
              <v-bigimg v-if="showImg" @hideViewImg="viewImg" :imgSrc="imgSrc"></v-bigimg>
              <div class="form-group col-sm-4 txr">
                  <label class="label_height"><span class="info">*</span> 申报机构承诺公函：</label>
              </div>
              <div class="form-group col-sm-8 imb">
                <p class="label_height"><b>下载</b> <a>承诺公函</a></p>
                <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
                <br/>
                <small class="info label_height">请上传完整的承诺公函</small>
                <br/>
                <br/>
                 <v-idcardupload uploadid="upload2" :imgUrl="letterImageUrl" text="上传图片" @acceptImgSrc="bigimg" @acceptData="setLetterImageUrl"></v-idcardupload>
              </div>
              <div class="form-group col-sm-4 txr">
                  <label class="label_height"><span class="info">*</span> 负责人尽职调查表：</label>
              </div>
              <div class="form-group col-sm-8 imb">
                <p class="label_height"><b>下载</b> <a>尽职调查表</a></p>
                <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
                <br/>
                <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
                <br/>
                <br/>
                <v-upload len="3" :imgUrl="chargerSurveyImageUrl" @acceptImgSrc="bigimg" @acceptData="setChargerSurveyImageUrl" uploadid="upload3"></v-upload>
              </div>
              <div class="form-group col-sm-4 txr">
                  <label class="label_height"><span class="info">*</span> 负责人承诺公函：</label>
              </div>
              <div class="form-group col-sm-8 imb">
                <p class="label_height"><b>下载</b> <a>承诺公函</a></p>
                <small class="info2 label_height">文件要求：上传加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
                <br/>
                <small class="info label_height">请上传完整的承诺公函</small>
                <br/>
                <br/>
                <v-idcardupload uploadid="upload4" :imgUrl="chargerImageUrl" text="上传图片" @acceptImgSrc="bigimg" @acceptData="setChargerImageUrl"></v-idcardupload>
              </div>
              <div class="form-group col-sm-4 txr">
                  <label class="label_height"><span class="info">*</span> 企业工商营业执照：</label>
              </div>
              <div class="form-group col-sm-8 imb">
                <small class="info2 label_height">只支持中国大陆工商局或市场监督管理局颁发的工商营业执照，且必须在有效期内，需与之前基本信息中所填企业相同。</small>
                <br/>
                <small class="info2 label_height">格式要求：上次加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
                <br/>
                <br/>
                <v-idcardupload uploadid="upload5" text="上传图片" :imgUrl="commerceImageUrl" @acceptImgSrc="bigimg" @acceptData="setCommerceImageUrl"></v-idcardupload>
              </div>
              <div class="form-group col-sm-4 txr">
                  <label class="label_height"> 其他补充材料：</label>
              </div>
              <div class="form-group col-sm-8 imb">
                <small class="info2 label_height">如果您有国家授予的其他资质材料也可以上传至此，可增加通过率。 </small>
                <br/>
                <small class="info2 label_height">支持格式：jpg、bmp、png、gif格式照片，大小不超过2M，最多5张。</small>
                <br/>
                <br/>
                <v-upload len="5" :imgUrl="otherImageUrl" @acceptImgSrc="bigimg" @acceptData="setOtherImageUrl" uploadid="upload6"></v-upload>
              </div>
              <div class="form-group col-sm-4 txr">
              </div>
              <div class="form-group col-sm-8 imb">
                  <button class="btn js-ajax-submit" @click="submit">提交</button>
              </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import upload from '@/components/upload';
import idCardUpload from '@/components/upload/idCardUpload';
import geoarea from '@/components/reegionalCascade/geoArea';
import registerHead from '@/components/registerHead';
import bigImg from '@/components/bigImg';
import apparea from '@/components/reegionalCascade/appArea';
import rules from '@/config/rules';
import errInfo from '@/components/info/error';
import { DECLARE_PUT_REGISTINFO, DECLARE_GET_BASEINFO } from '@/config/env';

export default {
  name: 'step4',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      showImg: false,
      imgSrc: '',
      isShowCard: false,
      isShowName: false,
      surveyImageUrl: '',
      letterImageUrl: '',
      chargerSurveyImageUrl: '',
      chargerImageUrl: '',
      commerceImageUrl: '',
      otherImageUrl: '',
      errMsg: [],
    };
  },
  components: {
    'v-upload': upload,
    'v-geoarea': geoarea,
    'v-registerhead': registerHead,
    'v-bigimg': bigImg,
    'v-apparea': apparea,
    'v-idcardupload': idCardUpload,
    'v-errinfo': errInfo,
  },
  methods: {
    validate() {
      this.errMsg = [];
      //  申报机构尽职调查表
      if (!this.surveyImageUrl) {
        this.errMsg.push(`${rules.upload}${rules.surveyImageUrl}`);
      }
      //  申报机构承诺公函
      if (!this.letterImageUrl) {
        this.errMsg.push(`${rules.upload}${rules.letterImageUrl}`);
      }
      //  负责人尽职调查表
      if (!this.chargerSurveyImageUrl) {
        this.errMsg.push(`${rules.upload}${rules.chargerSurveyImageUrl}`);
      }
      //  负责人承诺公函
      if (!this.chargerImageUrl) {
        this.errMsg.push(`${rules.upload}${rules.chargerImageUrl}`);
      }
      //  企业工商营业执照
      if (!this.commerceImageUrl) {
        this.errMsg.push(`${rules.upload}${rules.commerceImageUrl}`);
      }
    },
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
    setSurveyImageUrl(d) {
      this.surveyImageUrl = d;
    },
    setLetterImageUrl(d) {
      this.letterImageUrl = d;
    },
    setChargerSurveyImageUrl(d) {
      this.chargerSurveyImageUrl = d;
    },
    setChargerImageUrl(d) {
      this.chargerImageUrl = d;
    },
    setCommerceImageUrl(d) {
      this.commerceImageUrl = d;
    },
    setOtherImageUrl(d) {
      this.otherImageUrl = d;
    },
    async submit() {
      this.validate();
      const obj = {};
      obj.surveyImageUrl = this.surveyImageUrl;
      obj.letterImageUrl = this.letterImageUrl;
      obj.chargerSurveyImageUrl = this.chargerSurveyImageUrl;
      obj.chargerImageUrl = this.chargerImageUrl;
      obj.commerceImageUrl = this.commerceImageUrl;
      obj.otherImageUrl = this.otherImageUrl;
      if (this.errMsg.length !== 0) {
        return;
      }
      const res = await this.$xhr('post', DECLARE_PUT_REGISTINFO, obj);
      if (res.data.code === 0) {
        this.$router.push('/step5');
      }
    },
  },
  async mounted() {
    if (this.$route.params.type === '1') {
      return;
    }
    const res = await this.$xhr('get', DECLARE_GET_BASEINFO);
    if (res.data.code === 0) {
      this.surveyImageUrl = res.data.data.surveyImageUrl;
      this.letterImageUrl = res.data.data.letterImageUrl;
      this.chargerSurveyImageUrl = res.data.data.chargerSurveyImageUrl;
      this.chargerImageUrl = res.data.data.chargerImageUrl;
      this.commerceImageUrl = res.data.data.commerceImageUrl;
      this.otherImageUrl = res.data.data.otherImageUrl;
      if (res.data.data.reason) {
        this.errMsg.push(res.data.data.reason);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.err {
  color: #ac2925;
}
.success {
  color: #4cae4c;
}
.ierr {
  border: 1px solid #ac2925
}
.isuccess {
  border: 1px solid #4cae4c
}
.container {
  padding: 0px 55px;
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
  line-height: 25px;
}
.imb {
  margin-bottom: 30px;
}
.info {
  color: #ac2925;
}
.info2 {
  color: #999;
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
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 25px;
    color: #fff;
    width: 180px;
    background-color: rgba(73,43,253,0);
    border-color: rgba(255,255,255,0.7);
}
.js-ajax-submit {
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>