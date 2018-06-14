<template>
  <div>
    <v-register-head :step="4"></v-register-head>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div>
      <div class="step_more">
        <div v-if="reason" style="text-align: center;color: red;">
          <span class="glyphicon glyphicon-exclamation-sign"></span> <span style="position: relative;top:-1px;">{{reason}}</span>
        </div>
       <div class="step_chunk">
          <div class="container">
          <div class="form-inline  clearfix">
            <div class="form-group col-sm-12 txc imb">
              <h3>申请材料</h3>
              <br/>
            </div>
            <div class="form-group col-sm-4 txr">
              <label class="label_height"><span class="callout-red">*</span> 申报机构尽职调查表：</label>
            </div>
            <div class="form-group col-sm-8 imb">
              <p class="label_height"><b>下载</b> <a class="fc" download :href="template.sbjgjzdcb">尽职调查表</a><img :src="xiazaiIcon"></img></p>
              <small class="callout label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
              <br/>
              <small class="callout-red label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
              <br/>
              <br/>
              <v-multiple-upload len="5" :imgSrc="initSurveyImageUrl" title="上传调查表" @acceptData="setSurveyImageUrl" uploadid="upload1"></v-multiple-upload>
            </div>
            <div class="form-group col-sm-4 txr">
              <label class="label_height"><span class="callout-red">*</span> 申报机构承诺公函：</label>
            </div>
            <div class="form-group col-sm-8 imb">
              <p class="label_height"><b>下载</b> <a class="fc" download :href="template.sbjgcngh">承诺公函</a><img :src="xiazaiIcon"></img></p>
              <small class="callout label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
              <br/>
              <small class="callout-red label_height">请上传完整的承诺公函</small>
              <br/>
              <br/>
               <v-multiple-upload len="1" uploadid="upload2" :imgSrc="initLetterImageUrl" title="上传承诺公函" @acceptData="setLetterImageUrl"></v-multiple-upload>
            </div>
            <div class="form-group col-sm-4 txr">
              <label class="label_height"><span class="callout-red">*</span> 负责人尽职调查表：</label>
            </div>
            <div class="form-group col-sm-8 imb">
              <p class="label_height"><b>下载</b> <a download :href="template.sbjgfzrjzdcb" class="fc">尽职调查表</a><img :src="xiazaiIcon"></img></p>
              <small class="callout label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
              <br/>
              <small class="callout-red label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
              <br/>
              <br/>
              <v-multiple-upload len="5" :imgSrc="initChargerSurveyImageUrl" title="上传尽职调查表" @acceptData="setChargerSurveyImageUrl" uploadid="upload3"></v-multiple-upload>
            </div>
            <!-- <div class="form-group col-sm-4 txr">
              <label class="label_height"><span class="callout-red">*</span> 负责人承诺公函：</label>
            </div>
            <div class="form-group col-sm-8 imb">
              <p class="label_height"><b>下载</b> <a download :href="template.sbjgfzrjzdcb">承诺公函</a></p>
              <small class="callout label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
              <br/>
              <small class="callout-red label_height">请上传完整的承诺公函</small>
              <br/>
              <br/>
              <v-multiple-upload len="1" uploadid="upload4" :imgSrc="initChargerImageUrl" title="上传承诺公函" @acceptData="setChargerImageUrl"></v-multiple-upload>
            </div> -->
            <div class="form-group col-sm-4 txr">
              <label class="label_height"><span class="callout-red">*</span> 企业工商营业执照：</label>
            </div>
            <div class="form-group col-sm-8 imb">
              <small class="callout label_height">只支持中国大陆工商局或市场监督管理局颁发的工商营业执照，且必须在有效期内，需与之前基本信息中所填企业相同。</small>
              <br/>
              <small class="callout label_height">格式要求：上次加盖企业公章的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
              <br/>
              <br/>
              <v-multiple-upload len="1" uploadid="upload5" title="上传营业执照" :imgSrc="initCommerceImageUrl" @acceptData="setCommerceImageUrl"></v-multiple-upload>
            </div>
            <div class="form-group col-sm-4 txr">
              <label class="label_height"> 其他补充材料：</label>
            </div>
            <div class="form-group col-sm-8 imb">
              <small class="callout label_height">如果您有国家授予的其他资质材料也可以上传至此，可增加通过率。 </small>
              <br/>
              <small class="callout label_height">支持格式：jpg、bmp、png、gif格式照片，大小不超过2M，最多5张。</small>
              <br/>
              <br/>
              <v-multiple-upload len="5" :imgSrc="initOtherImageUrl" title="上传补充材料" @acceptData="setOtherImageUrl" uploadid="upload6"></v-multiple-upload>
            </div>
            <div class="form-group col-sm-4 txr">
            </div>
            <div class="form-group col-sm-8 imb">
              <button v-show="isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" @click="submit">提交</button>
              <button v-show="!isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" disabled>提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import multipleUpload from '@/components/upload/multipleUpload';
import registerHead from '@/components/header/registerHead';
import rules from '@/config/rules';
import errInfo from '@/components/info/error';
import xiazaiIcon from '@/assets/img/xiazaiIcon.gif';
import { DECLARE_PUT_REGISTINFO, DECLARE_GET_BASEINFO, EXCEL_SERVER_URL } from '@/config/env';

export default {
  name: 'step4',
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
      initSurveyImageUrl: '',
      initLetterImageUrl: '',
      initChargerSurveyImageUrl: '',
      initChargerImageUrl: '',
      initCommerceImageUrl: '',
      initOtherImageUrl: '',
      xiazaiIcon,
      errMsg: [],
      infoTimer: null,
      isShowSubmit: true,
      timer: new Date().getTime(),
      reason: null,
      template: {
        zxbtzjsbb: `${EXCEL_SERVER_URL}/template/zxbtzjsbb.docx`,
        qysqrkh: `${EXCEL_SERVER_URL}/template/qysqrkh.docx`,
        zddbhzgtwtdlrsqwts: `${EXCEL_SERVER_URL}/template/zddbhzgtwtdlrsqwts.docx`,
        sbqyjzdcb: `${EXCEL_SERVER_URL}/template/sbqyjzdcb.docx`,
        sbqyfzrjzdcb: `${EXCEL_SERVER_URL}/template/sbqyfzrjzdcb.docx`,
        sbjgjzdcb: `${EXCEL_SERVER_URL}/template/sbjgjzdcb.docx`,
        sbjgcngh: `${EXCEL_SERVER_URL}/template/sbjgcngh.docx`,
        sbjgfzrjzdcb: `${EXCEL_SERVER_URL}/template/sbjgfzrjzdcb.docx`,
      },
    };
  },
  components: {
    'v-multiple-upload': multipleUpload,
    'v-register-head': registerHead,
    'v-error-info': errInfo,
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
      // if (!this.chargerImageUrl) {
      //   this.errMsg.push(`${rules.upload}${rules.chargerImageUrl}`);
      // }
      //  企业工商营业执照
      if (!this.commerceImageUrl) {
        this.errMsg.push(`${rules.upload}${rules.commerceImageUrl}`);
      }
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
        clearTimeout(this.infoTimer);
        this.infoTimer = setTimeout(() => { this.errMsg = []; }, 3000);
        return;
      }
      this.isShowSubmit = !this.isShowSubmit;
      const res = await this.$http.post(DECLARE_PUT_REGISTINFO, obj);
      if (res.success) {
        this.$router.push('/step5');
      } else {
        this.isShowSubmit = !this.isShowSubmit;
      }
    },
  },
  async mounted() {
    if (this.$route.params.type === '1') {
      return;
    }
    const res = await this.$http.get(DECLARE_GET_BASEINFO);
    if (res.success) {
      this.surveyImageUrl = res.data.surveyImageUrl;
      this.letterImageUrl = res.data.letterImageUrl;
      this.chargerSurveyImageUrl = res.data.chargerSurveyImageUrl;
      this.chargerImageUrl = res.data.chargerImageUrl;
      this.commerceImageUrl = res.data.commerceImageUrl;
      this.otherImageUrl = res.data.otherImageUrl;
      this.initSurveyImageUrl = res.data.surveyImageUrl;
      this.initLetterImageUrl = res.data.letterImageUrl;
      this.initChargerSurveyImageUrl = res.data.chargerSurveyImageUrl;
      this.initChargerImageUrl = res.data.chargerImageUrl;
      this.initCommerceImageUrl = res.data.commerceImageUrl;
      this.initOtherImageUrl = res.data.otherImageUrl;
      this.reason = res.data.reason;
      // if (res.data.reason) {
      //   this.errMsg.push(res.data.reason);
      // }
    }
  },
};
</script>

<style lang="scss" scoped>
.step_more{padding: 250px 60px 50px;background: #f6f7fb;}
.step_chunk{ background:#fff; padding: 40px 40px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
.fc{color: #4786ff; border-bottom: 1px solid #4786ff; margin-left: 10px; margin-right: 10px;}
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
  margin-bottom: 60px;
}
</style>