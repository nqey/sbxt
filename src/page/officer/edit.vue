<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div class="index_more">
      <div class="index_chunk">
        <div class="t_nav">&#12288;添加申报官</div>
      <hr>
      <div v-if="reason" style="text-align: center;color: red;">
        <span class="glyphicon glyphicon-exclamation-sign"></span> <span style="position: relative;top:-1px;">{{reason}}</span>
      </div> 
     <div class="form-inline clearfix">
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 姓 名：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <input type="text" class="form-control iw600" placeholder="请输入申报官真实姓名" v-model="name">
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 手机号码：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <span class="label_height">{{cellphone}}&#12288;&#12288;</span>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
            <label class="label_height"><span class="info">*</span> 常住区域：</label>
        </div>
        <div class="form-group col-sm-10 imb">
           <v-area :areacode="areacode" @acceptData="setLiveAddress"></v-area>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 寸 照：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height areafc">请按照示例图拍摄，蓝底、正装寸照；将照片上传至此；支持格式：bmp、jpg、png、gif。 </p>
          <p class="areafc">照片大小不超过2M。</p>
          <small class="info label_height">请上传本人真实照，审核会与身份证进行对比，不按照要求上传会导致审核通不过。</small>
          <br/>
          <br/>
          <v-multiple-upload :imgSrc="initPortrait" len="1" title="上传寸照" @acceptData="setPortrait" uploadid="upload1"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 身份证号码：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <input type="text" class="form-control iw600" placeholder="请输入身份证号码" v-model="idNumber" @blur="validate">
          <br/>
          <br/>
          &#12288;<small class="areafc">申报官真实有效身份证号码，每一个身份证号只能添加一名申报官。</small>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span>身份证照片：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <small class="info2 label_height">请按照示例上传证件照片；支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <p></p>
          <small class="info label_height">请上传本人真实身份证，否则审核不通过。</small>
          <div class="clearfix"></div>
          <div class="pull-left" style="width: 200px;margin-right: 30px;">
            <v-multiple-upload len="1" :imgSrc="initIdFrontUrl" uploadid="upload2" title="上传正面" @acceptData="setFrontUrl"></v-multiple-upload>
          </div>
          <div class="pull-left" style="width: 200px;">
            <v-multiple-upload len="1" :imgSrc="idBackUrl" uploadid="upload3" title="上传背面" @acceptData="setBackUrl"></v-multiple-upload>
          </div>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 尽职调查表：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height"><b>下载</b> <a class="fc" download :href="template.sbjgjzdcb">尽职调查表</a><img :src="xiazaiIcon"></img></p>
          <small class="info2 label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <br/>
          <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
          <br/>
          <br/>
          <v-multiple-upload len="5" :imgSrc="initSurveyImageUrl" title="上传尽职调查表" @acceptData="setSurveyImageUrl" uploadid="upload4"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
          <label class="label_height"><span class="info">*</span> 承诺公函：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <p class="label_height"><b>下载</b> <a  class="fc" download :href="template.sbjgcngh">承诺公函</a><img :src="xiazaiIcon"></img></p>
          <small class="info2 label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
          <br/>
          <small class="info label_height">请上传完整的承诺公函</small>
          <br/>
          <br/>
          <v-multiple-upload len="1" :imgSrc="initLetterImageUrl" title="上传承诺公函" @acceptData="setLetterImageUrl" uploadid="upload5"></v-multiple-upload>
        </div>
        <div class="form-group col-sm-2 txr clearfix">
        </div>
        <div class="form-group col-sm-10 imb">
          <button v-show="isShowSubmit" type="button" class="btn btn-success" @click="submit" style="height: 35px;">提交</button>
          <button v-show="!isShowSubmit" type="button" class="btn btn-success" disabled style="height: 35px;">提交</button>
          <br/>
          <br/>
          <p class="areafc">&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#32;申报官信息需审核</p>
        </div>
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
import xiazaiIcon from '@/assets/img/xiazaiIcon.gif';
import { DECLARE_GET_DECLARER_DETAILS, DECLARE_PUT_DECLARER, EXCEL_SERVER_URL } from '@/config/env';
import area from '@/components/area/area';

export default {
  name: 'officerDetail',
  data() {
    return {
      isShowSubmit: true,
      name: '',
      cellphone: '',
      idNumber: '',
      reason: '',
      score: 0,
      portrait: '',
      idFrontUrl: '',
      idBackUrl: '',
      surveyImageUrl: '',
      letterImageUrl: '',
      initIdFrontUrl: '',
      initIdBackUrl: '',
      initSurveyImageUrl: '',
      initLetterImageUrl: '',
      initPortrait: '',
      liveAddress: '',
      state: '',
      area: '',
      areacode: '',
      errMsg: [],
      infoTimer: null,
      xiazaiIcon,
      template: {
        sbgjzdcb: `${EXCEL_SERVER_URL}/template/sbgjzdcb.docx`,
        sbgcngh: `${EXCEL_SERVER_URL}/template/sbgcngh.docx`,
      },
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
      // 常驻区域
      if (!this.liveAddress) {
        this.errMsg.push(`${rules.select}常驻区域`);
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
      const res = await this.$http.get(`${DECLARE_GET_DECLARER_DETAILS}${this.$route.params.id}`);
      if (res.success) {
        this.name = res.data.name;
        this.cellphone = res.data.cellphone;
        this.idNumber = res.data.idNumber;
        this.reason = res.data.reason;
        // if (this.reason) {
        //   this.errMsg.push(this.reason);
        // }
        if (res.data.score === -1) {
          this.score = '未考试';
        } else {
          this.score = `${res.data.score}分`;
        }
        this.portrait = res.data.portrait;
        this.idFrontUrl = res.data.idFrontUrl;
        this.idBackUrl = res.data.idBackUrl;
        this.surveyImageUrl = res.data.surveyImageUrl;
        this.letterImageUrl = res.data.letterImageUrl;
        this.initPortrait = res.data.portrait;
        this.initIdFrontUrl = res.data.idFrontUrl;
        this.initIdBackUrl = res.data.idBackUrl;
        this.initSurveyImageUrl = res.data.surveyImageUrl;
        this.initLetterImageUrl = res.data.letterImageUrl;
        this.areacode = `${res.data.proviceCode},${res.data.cityCode},${res.data.areaCode}`;
        this.area = `${res.data.provice}-${res.data.city}-${res.data.district}`;
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
      this.isShowSubmit = !this.isShowSubmit;
      const res = await this.$http.post(`${DECLARE_PUT_DECLARER}${this.$route.params.id}`, param);
      if (res.success) {
        sessionStorage.setItem('title', '更新申报官');
        sessionStorage.setItem('content', '更新申报官成功');
        sessionStorage.setItem('content2', '');
        sessionStorage.setItem('content3', '');
        sessionStorage.setItem('alink', '');
        sessionStorage.setItem('blink', '/officer/list');
        sessionStorage.setItem('clink', '');
        this.$router.push('/message');
      } else {
        this.isShowSubmit = !this.isShowSubmit;
      }
    },
  },
  components: {
    'v-img': vimg,
    'v-error-info': errInfo,
    'v-multiple-upload': multipleUpload,
    'v-portrait-upload': portraitUpload,
    'v-portrait-img': vPortraitImg,
    'v-area': area,
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
.form-inline{ margin-top: 60px; }
.fc{color: #4786ff; border-bottom: 1px solid #4786ff; margin-right: 10px;}
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
  width: 450px;
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