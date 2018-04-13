<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div class="bs-example">
      <p class="t_nav">&#12288;企业详情</p>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业全称：</label>
        </div>
        <div class="form-group col-sm-11">
          <div v-if="$route.params.type === '1'">
            <span class="label_height">{{name}}&#12288;&#12288;</span>
          </div>
          <div v-if="$route.params.type === '2'">
            <input type="text" class="form-control iw"  placeholder="请输入企业全称" v-model="name">
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业负责人：</label>
        </div>
        <div class="form-group col-sm-11">
          <div v-if="$route.params.type === '1'">
            <span class="label_height">{{charger}}&#12288;&#12288;</span>
          </div>
          <div v-if="$route.params.type === '2'">
            <input type="text" class="form-control iw"  placeholder="请输入企业负责人" v-model="charger">
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">手机号码：</label>
        </div>
        <div class="form-group col-sm-11">
          <div v-if="$route.params.type === '1'">
            <span class="label_height">{{cellphone}}&#12288;&#12288;</span>
          </div>
          <div v-if="$route.params.type === '2'">
            <input type="text" class="form-control iw"  placeholder="请输入手机号码" v-model="cellphone" @blur="validate">
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">身份证号码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <span v-if="$route.params.type === '1'">
            <span class="label_height">{{idNumber}}&#12288;&#12288;</span>
          </span>
          <span v-if="$route.params.type === '2'">
            <input type="text" class="form-control iw"  placeholder="请输入身份证号" v-model="idNumber" @blur="validate">
          </span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">身份证照片：</label>
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
          <div v-if="$route.params.type === '2'">
            <div v-if="idFrontUrl" class="pull-left" style="width: 200px;margin-right: 30px;">
              <v-multiple-upload len="1" :imgSrc="idFrontUrl" uploadid="upload2" title="上传正面" @acceptData="setFrontUrl"></v-multiple-upload len="1">
            </div>
            <div v-if="idBackUrl" class="pull-left" style="width: 200px;">
              <v-multiple-upload len="1" :imgSrc="idBackUrl" uploadid="upload3" title="上传背面" @acceptData="setBackUrl"></v-multiple-upload len="1">
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">营业执照：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <v-img :imgSrc="licenseImageUrl"></v-img>
          </div>
          <div v-if="$route.params.type === '2' && licenseImageUrl">
            <v-multiple-upload len="1" :imgSrc="licenseImageUrl" title="上传营业执照" @acceptData="setLicenseImageUrl" uploadid="up3"></v-multiple-upload len="1">
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">生产许可证：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <v-img :imgSrc="productionImageUrl"></v-img>
          </div>
          <div v-if="$route.params.type === '2' && productionImageUrl">
            <v-multiple-upload len="1" :imgSrc="productionImageUrl" title="上传许可证" @acceptData="setProductionImageUrl" uploadid="up4"></v-multiple-upload len="1">
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">资金补贴申报表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <div class="pull-left" v-for="url of capitalImageUrls">
              <v-img :imgSrc="url"></v-img>
            </div>
          </div>
          <div v-if="$route.params.type === '2' && capitalImageUrl">
            <v-multiple-upload len="1" :imgSrc="capitalImageUrl" title="上传申报表" @acceptData="setCapitalImageUrl" uploadid="up5"></v-multiple-upload len="1">
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <div class="pull-left" v-for="url of enterpriseSurveyImageUrls">
              <v-img :imgSrc="url"></v-img>
            </div>
          </div>
          <div v-if="$route.params.type === '2' && enterpriseSurveyImageUrl">
            <v-multiple-upload len="3" :imgSrc="enterpriseSurveyImageUrl" title="上传调查表" @acceptData="setEnterpriseSurveyImageUrl" uploadid="up6"></v-multiple-upload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业负责人尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <div class="pull-left" v-for="url of enterpriseChargerSurveyImageUrls">
              <v-img :imgSrc="url"></v-img>
            </div>
          </div>
          <div v-if="$route.params.type === '2' && enterpriseChargerSurveyImageUrl">
            <v-multiple-upload len="3" :imgSrc="enterpriseChargerSurveyImageUrl" title="上传调查表" @acceptData="setEnterpriseChargerSurveyImageUrl" uploadid="up7"></v-multiple-upload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业入库申请函：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <v-img :imgSrc="enterpriseShindImageUrl"></v-img>
          </div>
          <div v-if="$route.params.type === '2' && enterpriseShindImageUrl">
            <v-multiple-upload len="1" :imgSrc="enterpriseShindImageUrl" title="上传申请函" @acceptData="setEnterpriseShindImageUrl" uploadid="up8"></v-multiple-upload len="1">
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">授权委托书：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <v-img :imgSrc="authorizationImageUrl"></v-img>
          </div>
          <div v-if="$route.params.type === '2' && authorizationImageUrl">
            <v-multiple-upload len="1" :imgSrc="authorizationImageUrl" title="上传委托书" @acceptData="setAuthorizationImageUrl" uploadid="up9"></v-multiple-upload len="1">
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">其他补充材料：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-if="$route.params.type === '1'">
            <div class="pull-left" v-for="url of otherImageUrls">
              <v-img :imgSrc="url"></v-img>
            </div>
          </div>
          <div v-if="$route.params.type === '2' && otherImageUrl">
            <v-multiple-upload len="5" :imgSrc="otherImageUrl" title="上传补充材料" @acceptData="setOtherImageUrl" uploadid="up10"></v-multiple-upload>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr" v-if="$route.params.type === '2'">
        </div>
        <div class="form-group col-sm-11 imb" v-if="$route.params.type === '2'">
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
import vimg from '@/components/img/img';
import multipleUpload from '@/components/upload/multipleUpload';
import { DECLARE_GET_ENTERPRISE_ID, DECLARE_PUT_ENTERPRISE } from '@/config/env';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';

export default {
  name: 'detail',
  data() {
    return {
      name: '',
      charger: '',
      cellphone: '',
      idNumber: '',
      idFrontUrl: '',
      idBackUrl: '',
      licenseImageUrl: '',
      productionImageUrl: '',
      capitalImageUrl: '',
      capitalImageUrls: [],
      enterpriseSurveyImageUrl: '',
      enterpriseSurveyImageUrls: [],
      enterpriseChargerSurveyImageUrl: '',
      enterpriseChargerSurveyImageUrls: [],
      enterpriseShindImageUrl: '',
      authorizationImageUrl: '',
      otherImageUrl: '',
      otherImageUrls: [],
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
        if (res.data.data.capitalImageUrl) {
          this.capitalImageUrls = res.data.data.capitalImageUrl.split(',');
        }
        this.enterpriseSurveyImageUrl = res.data.data.enterpriseSurveyImageUrl;
        if (res.data.data.enterpriseSurveyImageUrl) {
          this.enterpriseSurveyImageUrls = res.data.data.enterpriseSurveyImageUrl.split(',');
        }
        this.enterpriseChargerSurveyImageUrl = res.data.data.enterpriseChargerSurveyImageUrl;
        if (res.data.data.enterpriseChargerSurveyImageUrl) {
          this.enterpriseChargerSurveyImageUrls = res.data.data.enterpriseChargerSurveyImageUrl.split(',');
        }
        this.enterpriseShindImageUrl = res.data.data.enterpriseShindImageUrl;
        this.authorizationImageUrl = res.data.data.authorizationImageUrl;
        this.otherImageUrl = res.data.data.otherImageUrl;
        if (res.data.data.otherImageUrl) {
          this.otherImageUrls = res.data.data.otherImageUrl.split(',');
        }
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
        sessionStorage.setItem('title', '更新申报企业');
        sessionStorage.setItem('content', '更新申报企业成功');
        sessionStorage.setItem('content2', '');
        sessionStorage.setItem('content3', '');
        sessionStorage.setItem('alink', '');
        sessionStorage.setItem('blink', '/decEnt');
        sessionStorage.setItem('clink', '');
        setTimeout(() => { this.$router.push('/message'); }, 1000);
      }
    },
  },
  components: {
    'v-img': vimg,
    'v-error-info': errInfo,
    'v-multiple-upload': multipleUpload,
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
