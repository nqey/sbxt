<!-- 申报官自主注册，登记到默认申报机构<中国商品诚信数据库> -->
<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <header class="scene">
      <p>申报官注册</p>
    </header>
    <div style="height: 50px;"></div>
    <form class="form-horizontal">
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label"><span class="info">*</span> 姓 名：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <input type="text" class="form-control" placeholder="请输入申报官真实姓名" v-model="name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label"><span class="info">*</span> 手机号码：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <input type="text" class="form-control" placeholder="请输入手机号码" v-model="cellphone" @blur="valcellphone">
            <small class="areafc" style="line-height: 50px">&#12288;该手机号必须是申报官真实手机号码，每一个手机号码只能添加一名申报官。</small>
            <div class="row">
              <div class="col-xs-8 col-sm-8">
                <input type="text" class="form-control" placeholder="请输入验证码" v-model="code"></input>
              </div>
              <div class="col-xs-4 col-sm-4" style="text-align: left;">
                <button v-show="show" type="button" class="btn hqyzm" @click="getCode" style="height: 34px;">获取验证码</button>
                <button v-show="!show" type="button" class="btn hqyzm">{{count}} s</button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label"><span class="info">*</span> 常住区域：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <v-area @acceptData="setLiveAddress"></v-area>
            <input type='text' class='form-control' placeholder='请输入详细地址' v-model="address">
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label"><span class="info">*</span> 寸 照：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <p class="label_height areafc">请按照示例图拍摄，蓝底、正装寸照；将照片上传至此；</p>
            <p class="areafc">支持格式：bmp、jpg、png、gif。 照片大小不超过2M。</p>
            <small class="info label_height">请上传本人真实照，审核会与身份证进行对比，不按照要求上传会导致审核通不过。</small>
            <br/>
            <br/>
            <v-multiple-upload len="1" title="上传寸照" @acceptData="setPortrait" uploadid="upload1"></v-multiple-upload>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label"><span class="info">*</span> 身份证号码：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <input type="text" class="form-control" placeholder="请输入身份证号码" v-model="idNumber" @blur="valIdNumber">
            <br/>
            <br/>
            &#12288;<small class="areafc">申报官真实有效身份证号码，每一个身份证号只能添加一名申报官。</small>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label"><span class="info">*</span>身份证照片：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <small class="info2 label_height">请按照示例上传证件照片；支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <p></p>
            <small class="info label_height">请上传本人真实身份证，否则审核不通过。</small>
            <div class="clearfix"></div>
            <div class="pull-left" style="width: 200px;margin-right: 30px;">
              <v-multiple-upload len="1" uploadid="upload2" title="上传正面" @acceptData="frontUrl"></v-multiple-upload>
            </div>
            <div class="pull-left" style="width: 200px;">
              <v-multiple-upload len="1" uploadid="upload3" title="上传背面" @acceptData="backUrl"></v-multiple-upload>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label"><span class="info">*</span> 尽职调查表：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <p class="label_height"><b>下载</b> <a class="fc" download :href="template.sbgjzdcb">尽职调查表</a></p>
            <small class="info2 label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <br/>
            <small class="info label_height">请认真填写每一必填项，再上传完整的尽职调查表</small>
            <br/>
            <br/>
            <v-multiple-upload len="5" title="上传尽职调查表" @acceptData="setSurveyImageUrl"
                               uploadid="upload4"></v-multiple-upload>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label"><span class="info">*</span> 承诺公函：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <p class="label_height"><b>下载</b> <a class="fc" download :href="template.sbgcngh">承诺公函</a></p>
            <small class="info2 label_height">文件要求：上传加盖手印的原件照片或扫描件。支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
            <br/>
            <small class="info label_height">请上传完整的承诺公函</small>
            <br/>
            <br/>
            <v-multiple-upload len="1" title="上传承诺公函" @acceptData="setLetterImageUrl"
                               uploadid="upload5"></v-multiple-upload>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-12 col-sm-4 control-label">推荐人工号：</label>
          <div class="col-xs-12 col-sm-4 imb">
            <input type="text" class="form-control"
                   placeholder="请输入推荐人电话号码" v-model="recommendId" disabled>
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-12 col-sm-offset-4 col-sm-4 imb">
            <button v-show="isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" @click="submit">
              提交
            </button>
            <button v-show="!isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" disabled>提交
            </button>
            <a href="http://base.cpsdb61.com/publics/file/transfer/regist.pdf?name=%E5%AD%94%E6%B8%85&&areaCode=510000" target="_blank">注册协议</a>
            <br/>
            <br/>
            <p class="areafc">&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#32;申报官信息需审核</p>
          </div>
        </div>
    </form>
  </div>
</template>

<script>
import multipleUpload from '@/components/upload/multipleUpload';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';
import { DECLARE_GET_VALIDATECODE, DECLARE_PUBLICS_POST_DECLARER, EXCEL_SERVER_URL,
PUBLICS_GET_CHECK_CELLPHONE, PUBLICS_DAYU_GETPHONE } from '@/config/env';
import area from '@/components/area/area';

export default {
  name: 'registerOfficer',
  data() {
    return {
      isShowSubmit: true,
      name: '',
      cellphone: '',
      code: '',
      portrait: '',
      idNumber: '',
      idFrontUrl: '',
      idBackUrl: '',
      surveyImageUrl: '',
      letterImageUrl: '',
      liveAddress: '',
      showImg: false,
      errMsg: [],
      show: true,
      count: '',
      list: [],
      recommendName: '',
      recommendId: '',
      recommendType: '',
      timer: null,
      infoTimer: null,
      address: null,
      template: {
        sbgjzdcb: `${EXCEL_SERVER_URL}/template/sbgjzdcb.docx`,
        sbgcngh: `${EXCEL_SERVER_URL}/template/sbgcngh.docx`,
      },
    };
  },
  methods: {
    async valcellphone() {
      this.errMsg = [];
      // 手机号码验证
      if (this.cellphone && !rules.mPattern.pattern.test(this.cellphone)) {
        this.errMsg.push(rules.mPattern.message);
        return;
      }
      // 手机号码验证
      if (this.cellphone) {
        await this.$http.get(`${PUBLICS_GET_CHECK_CELLPHONE}${this.cellphone}`);
      }
    },
    async valIdNumber() {
      this.errMsg = [];
      // 身份证号码
      if (this.idNumber && !rules.cP.pattern.test(this.idNumber)) {
        this.errMsg.push(rules.cP.message);
        return false;
      }
      //  身份证号码
      if (!this.idNumber) {
        this.errMsg.push(`${rules.nonEmpty}${rules.idNumber}`);
        return false;
      }
      this.getRCode();
      return true;
    },
    async validate() {
      this.errMsg = [];
      // // 手机号码验证
      // if (this.cellphone && !rules.mPattern.pattern.test(this.cellphone)) {
      //   this.errMsg.push(rules.mPattern.message);
      // }
      // // 手机号码验证
      // if (this.cellphone) {
      //   await this.$http.get(`${PUBLICS_GET_CHECK_CELLPHONE}${this.cellphone}`);
      // }
      // 身份证号码
      if (this.idNumber && !rules.cP.pattern.test(this.idNumber)) {
        this.errMsg.push(rules.cP.message);
      }
      // // 工号验证
      // if (this.recommendId && !rules.mPattern.pattern.test(this.recommendId)) {
      //   this.errMsg.push('请输入正确的工号！');
      // }
      // // 工号验证
      // if (this.recommendId) {
      //   await this.$http.get(`${PUBLICS_DECLARER_CHECK_CELLPHONE}${this.recommendId}`);
      // }
      // 手机号码验证
      if (!this.cellphone) {
        this.errMsg.push(`${rules.nonEmpty}${rules.phone}`);
      }
      // 姓 名
      if (!this.name) {
        this.errMsg.push(`${rules.nonEmpty}${rules.name}`);
      }
      // 验证码验证
      if (!this.code) {
        this.errMsg.push(`${rules.nonEmpty}${rules.validatecode}`);
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
      // 常住地址 详细地址
      if (!this.address) {
        this.errMsg.push(`${rules.nonEmpty}${rules.address}`);
      }
    },
    frontUrl(d) {
      this.idFrontUrl = d;
    },
    backUrl(d) {
      this.idBackUrl = d;
    },
    setLiveAddress(d) {
      this.liveAddress = d;
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
    async getCode() {
      this.errMsg = [];
      // 手机号码验证
      if (!rules.mPattern.pattern.test(this.cellphone)) {
        this.errMsg.push(rules.mPattern.message);
        return;
      }
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count -= 1;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      const res = await this.$http.get(`${DECLARE_GET_VALIDATECODE}addDeclarer/${this.cellphone}`);
      if (!res.success) {
        this.errMsg.push(res.data.message);
      }
    },
    async submit() {
      this.validate();
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
      obj.areaCode = this.liveAddress;
      obj.address = this.address;
      obj.recommendId = this.recommendId;
      obj.recommendType = this.recommendType;
      if (this.errMsg.length !== 0) {
        clearTimeout(this.infoTimer);
        this.infoTimer = setTimeout(() => {
          this.errMsg = [];
        }, 3000);
        return;
      }
      this.isShowSubmit = !this.isShowSubmit;
      const res = await this.$http.post(DECLARE_PUBLICS_POST_DECLARER, obj);
      if (res.success) {
        this.$router.push('/officer/registerSuccess');
      } else {
        this.isShowSubmit = !this.isShowSubmit;
      }
    },
    async getRCode() {
      const res = await this.$http.get(`${PUBLICS_DAYU_GETPHONE}${this.idNumber}`);
      if (res.success) {
        this.recommendId = res.data;
      }
    },
  },
  components: {
    'v-multiple-upload': multipleUpload,
    'v-error-info': errInfo,
    'v-area': area,
  },
  beforeMount() {
    if ((document.documentElement.clientWidth || document.body.clientWidth) < 768) {
      this.$router.push('/officer/registerEl');
    }
  },
};
</script>

<style lang="scss" scoped>
.bdsug {
  position: absolute;
  z-index: 1;
  width: 538px;
  background: #fff;
  border: 1px solid #ccc;
  _overflow: hidden;
  box-shadow: 1px 1px 3px #ededed;
  -webkit-box-shadow: 1px 1px 3px #ededed;
  -moz-box-shadow: 1px 1px 3px #ededed;
  -o-box-shadow: 1px 1px 3px #ededed;
}
.bdsug li {
  width: 522px;
  color: #000;
  font: 14px arial;
  line-height: 22px;
  padding: 0 8px;
  position: relative;
  cursor: default;
}
.bdsug li:hover {
  background-color: #888;
}
.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}

.form-inline {
  margin-top: 60px;
}
.fc {
  color: #4786ff;
  border-bottom: 1px solid #4786ff;
}
.hqyzm {
  background: #dae7ff;
  color: #4786ff;
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


.info {
  color: red;
}
.areafc {
  color: #999;
}

.scene {
  width: 100%;
  color: #fff;
  font-size: 30px;
  text-align: center;
  background: url(../../assets/img/officer_register_banner.jpg);
}
.form-control {
  width: 100%;
}
.js-ajax-submit {
  width: 350px;
  margin: auto;
  color: #fff;
  background: rgb(1, 200, 83);
}
@media (max-width: 768px) {
  .scene {
    height: 100px;
    line-height: 100px;
  }
  .form-group {
    margin-right: 0;
    margin-left: 0;
  }
  .js-ajax-submit {
    width: auto;
    margin: auto;
    color: #fff;
    background: rgb(1, 200, 83);
  }
  .label_height {
    height: 15px;
    line-height: 15px;
  }
  .mt {
    margin-top: 10px;
  }
  .imb {
    margin-bottom: 10px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
}
@media (min-width: 992px) {
  .scene {
    height: 300px;
    line-height: 300px;
  }
  .mt {
    margin-top: 30px;
  }
  .imb {
    margin-bottom: 30px;
  }
  .label_height {
    height: 35px;
    line-height: 35px;
  }
}
</style>
