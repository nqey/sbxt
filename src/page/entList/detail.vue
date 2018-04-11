<template>
  <div>
    <v-errinfo :errMsg="errMsg"></v-errinfo>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;企业详情</span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height">企业全称：</label>
        </div>
        <div class="form-group col-sm-11">
            <div v-show="isShowName">
              <span class="label_height">{{name}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editName"></span>
            </div>
            <div v-show="!isShowName">
              <input type="text" class="form-control iw"  placeholder="请输入企业全称" v-model="name">
              <span class="glyphicon glyphicon-floppy-saved" @click="editName"></span>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">企业负责人：</label>
        </div>
        <div class="form-group col-sm-11">
            <div v-show="isShowCharger">
              <span class="label_height">{{charger}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editCharger"></span>
            </div>
            <div v-show="!isShowCharger">
              <input type="text" class="form-control iw"  placeholder="请输入企业负责人" v-model="charger">
              <span class="glyphicon glyphicon-floppy-saved" @click="editCharger"></span>
            </div>
        </div>
        <div class="clearfix"></div>
        <v-bigimg v-if="showImg" @hideViewImg="viewImg" :imgSrc="imgSrc"></v-bigimg>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">手机号码：</label>
        </div>
        <div class="form-group col-sm-11">
            <div v-show="isShowtell">
              <span class="label_height">{{cellphone}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editTell"></span>
            </div>
            <div v-show="!isShowtell">
              <input type="text" class="form-control iw"  placeholder="请输入手机号码" v-model="cellphone" @blur="validate">
              <span class="glyphicon glyphicon-floppy-saved" @click="editTell"></span>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">身份证号码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <span v-show="isShowNumber">
              <span class="label_height">{{idNumber}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editNumber"></span>
            </span>
            <span v-show="!isShowNumber">
              <input type="text" class="form-control iw"  placeholder="请输入身份证号" v-model="idNumber" @blur="validate">
              <span class="glyphicon glyphicon-floppy-saved" @click="editNumber"></span>
            </span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">身份证照片：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="idFrontUrl" @acceptImgSrc="bigimg"></v-commonimg>
            <v-commonimg :imgSrc="idBackUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-idcardupload :imgUrl="idFrontUrl" text="上传正面" @acceptImgSrc="bigimg" @acceptData="setFrontUrl" uploadid="up1"></v-idcardupload>
            <v-idcardupload :imgUrl="idBackUrl" text="上传背面" @acceptImgSrc="bigimg" @acceptData="setBackUrl" uploadid="up2"></v-idcardupload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">营业执照：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="licenseImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-idcardupload :imgUrl="licenseImageUrl" text="上传营业执照" @acceptImgSrc="bigimg" @acceptData="setLicenseImageUrl" uploadid="up3"></v-idcardupload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">生产许可证：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="productionImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-idcardupload :imgUrl="productionImageUrl" text="上传许可证" @acceptImgSrc="bigimg" @acceptData="setProductionImageUrl" uploadid="up4"></v-idcardupload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">资金补贴申报表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="capitalImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-idcardupload :imgUrl="capitalImageUrl" text="上传申报表" @acceptImgSrc="bigimg" @acceptData="setCapitalImageUrl" uploadid="up5"></v-idcardupload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="enterpriseSurveyImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-upload len="3" :imgUrl="enterpriseSurveyImageUrl" @acceptImgSrc="bigimg" @acceptData="setEnterpriseSurveyImageUrl" uploadid="up6"></v-upload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业负责人尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="enterpriseChargerSurveyImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-upload len="3" :imgUrl="enterpriseChargerSurveyImageUrl" @acceptImgSrc="bigimg" @acceptData="setEnterpriseChargerSurveyImageUrl" uploadid="up7"></v-upload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业入库申请函：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="enterpriseShindImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-idcardupload :imgUrl="enterpriseShindImageUrl" text="上传申请函" @acceptImgSrc="bigimg" @acceptData="setEnterpriseShindImageUrl" uploadid="up8"></v-idcardupload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">授权委托书：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="authorizationImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-idcardupload :imgUrl="authorizationImageUrl" text="上传委托书" @acceptImgSrc="bigimg" @acceptData="setAuthorizationImageUrl" uploadid="up9"></v-idcardupload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">其他补充材料：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="$route.params.type === '1'">
            <v-commonimg :imgSrc="otherImageUrl" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
          <div v-show="$route.params.type === '2'">
            <v-upload len="5" :imgUrl="otherImageUrl" @acceptImgSrc="bigimg" @acceptData="setOtherImageUrl" uploadid="up10"></v-upload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr" v-show="$route.params.type === '2'">
        </div>
        <div class="form-group col-sm-11 imb" v-show="$route.params.type === '2'">
            <button class="btn js-ajax-submit" @click="submit">确认</button>
            <br/>
            <br/>
            <p class="areafc">&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#32;申报企业需审核</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bigImg from '@/components/bigImg';
import commonimg from '@/components/commonImg';
import idcardupload from '@/components/upload/idCardUpload';
import upload from '@/components/upload';
import { DECLARE_GET_ENTERPRISE_ID, DECLARE_PUT_ENTERPRISE } from '@/config/env';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';

export default {
  name: 'detail',
  data() {
    return {
      isShowName: true,
      isShowCharger: true,
      isShowtell: true,
      isShowNumber: true,
      showImg: false,
      name: '',
      charger: '',
      cellphone: '',
      idNumber: '',
      idFrontUrl: '',
      idBackUrl: '',
      licenseImageUrl: '',
      productionImageUrl: '',
      capitalImageUrl: '',
      enterpriseSurveyImageUrl: '',
      enterpriseSurveyImageUrls: [],
      enterpriseChargerSurveyImageUrl: '',
      enterpriseShindImageUrl: '',
      authorizationImageUrl: '',
      otherImageUrl: '',
      state: '',
      reason: '',
      errMsg: [],
    };
  },
  methods: {
    validate() {
      const errMsg = [];
      // 手机号码验证
      if (this.cellphone !== '' && !rules.mPattern.pattern.test(this.cellphone)) {
        errMsg.push(rules.mPattern.message);
      }
      // 生份证号码验证
      if (this.idNumber !== '' && !rules.cP.pattern.test(this.idNumber)) {
        errMsg.push(rules.cP.message);
      }
      this.errMsg = [...errMsg];
    },
    validate2() {
      this.validate();
      const errMsg = [];
      // 企业全称
      if (!this.name) {
        errMsg.push(`${rules.nonEmpty}${rules.enterpriseName}`);
      }
      // 企业负责人
      if (!this.charger) {
        errMsg.push(`${rules.nonEmpty}${rules.charger}`);
      }
      // 手机号码
      if (!this.cellphone) {
        errMsg.push(`${rules.nonEmpty}${rules.phone}`);
      }
      // 身份证号码
      if (!this.idNumber) {
        errMsg.push(`${rules.nonEmpty}${rules.idNumber}`);
      }
      // 营业执照
      if (!this.licenseImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.licenseImageUrl}`);
      }
      // 生产许可证
      if (!this.productionImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.productionImageUrl}`);
      }
      // 资金补贴申报表
      if (!this.capitalImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.capitalImageUrl}`);
      }
      // 企业尽职调查表
      if (!this.enterpriseSurveyImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.enterpriseSurveyImageUrl}`);
      }
      // 企业负责人尽职调查表
      if (!this.enterpriseChargerSurveyImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.enterpriseChargerSurveyImageUrl}`);
      }
      // 企业入库申请函
      if (!this.enterpriseShindImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.enterpriseShindImageUrl}`);
      }
      // 授权委托书
      if (!this.authorizationImageUrl) {
        errMsg.push(`${rules.nonEmpty}${rules.authorizationImageUrl}`);
      }
      this.errMsg = [...this.errMsg, ...errMsg];
    },
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
    editName() {
      this.isShowName = !this.isShowName;
    },
    editCharger() {
      this.isShowCharger = !this.isShowCharger;
    },
    editTell() {
      this.isShowtell = !this.isShowtell;
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
    setLicenseImageUrl(d) {
      this.licenseImageUrl = d;
    },
    setProductionImageUrl(d) {
      this.productionImageUrl = d;
    },
    setCapitalImageUrl(d) {
      this.capitalImageUrl = d;
    },
    setEnterpriseSurveyImageUrl(d) {
      this.enterpriseSurveyImageUrl = d;
    },
    setEnterpriseChargerSurveyImageUrl(d) {
      this.enterpriseChargerSurveyImageUrl = d;
    },
    setEnterpriseShindImageUrl(d) {
      this.enterpriseShindImageUrl = d;
    },
    setAuthorizationImageUrl(d) {
      this.authorizationImageUrl = d;
    },
    setOtherImageUrl(d) {
      this.otherImageUrl = d;
    },
    async init() {
      const id = this.$route.params.id;
      const res = await this.$xhr('get', `${DECLARE_GET_ENTERPRISE_ID}${id}`);
      if (res.data.code === 0) {
        this.name = res.data.data.name;
        this.charger = res.data.data.charger;
        this.cellphone = res.data.data.cellphone;
        this.idNumber = res.data.data.idNumber;
        this.idFrontUrl = res.data.data.idFrontUrl;
        this.idBackUrl = res.data.data.idBackUrl;
        this.licenseImageUrl = res.data.data.licenseImageUrl;
        this.productionImageUrl = res.data.data.productionImageUrl;
        this.capitalImageUrl = res.data.data.capitalImageUrl;
        this.enterpriseSurveyImageUrl = res.data.data.enterpriseSurveyImageUrl;
        if (res.data.data.enterpriseSurveyImageUrl) {
          this.enterpriseSurveyImageUrls = res.data.data.enterpriseSurveyImageUrl.split(',');
        }
        this.enterpriseChargerSurveyImageUrl = res.data.data.enterpriseChargerSurveyImageUrl;
        this.enterpriseShindImageUrl = res.data.data.enterpriseShindImageUrl;
        this.authorizationImageUrl = res.data.data.authorizationImageUrl;
        this.otherImageUrl = res.data.data.otherImageUrl;
        this.state = res.data.data.state;
        this.reason = res.data.data.reason;
        if (this.reason) {
          this.errMsg.push(this.reason);
        }
      }
    },
    async submit() {
      this.validate2();
      if (this.errMsg.length !== 0) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => { this.errMsg = []; }, 3000);
        return;
      }
      const id = this.$route.params.id;
      const param = {};
      param.name = this.name;
      param.charger = this.charger;
      param.cellphone = this.cellphone;
      param.idNumber = this.idNumber;
      param.idFrontUrl = this.idFrontUrl;
      param.idBackUrl = this.idBackUrl;
      param.licenseImageUrl = this.licenseImageUrl;
      param.productionImageUrl = this.productionImageUrl;
      param.capitalImageUrl = this.capitalImageUrl;
      param.enterpriseSurveyImageUrl = this.enterpriseSurveyImageUrl;
      param.enterpriseChargerSurveyImageUrl = this.enterpriseChargerSurveyImageUrl;
      param.enterpriseShindImageUrl = this.enterpriseShindImageUrl;
      param.authorizationImageUrl = this.authorizationImageUrl;
      param.otherImageUrl = this.otherImageUrl;
      param.state = this.state;
      param.reason = this.reason;
      const res = await this.$xhr('post', `${DECLARE_PUT_ENTERPRISE}${id}`, param);
      if (res.data.code === 0) {
        setTimeout(() => { this.$router.push('/ent/detail/msg'); }, 1000);
      }
    },
  },
  components: {
    'v-bigimg': bigImg,
    'v-commonimg': commonimg,
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
.js-ajax-submit {
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>
