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
          <span class="label_height">{{name}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业法人：</label>
        </div>
        <div class="form-group col-sm-11">
          <span class="label_height">{{charger}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">手机号码：</label>
        </div>
        <div class="form-group col-sm-11">
          <span class="label_height">{{cellphone}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">身份证号码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <span class="label_height">{{idNumber}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">身份证照片：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div class="pull-left" style="width: 200px;margin-right: 30px;">
            <v-img :imgSrc="idFrontUrl"></v-img>
          </div>
          <div class="pull-left" style="width: 200px;">
            <v-img :imgSrc="idBackUrl"></v-img>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">营业执照：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-img :imgSrc="licenseImageUrl"></v-img>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">生产许可证：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-img :imgSrc="productionImageUrl"></v-img>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">资金补贴申报表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div class="pull-left" v-for="url of capitalImageUrls">
            <v-img :imgSrc="url"></v-img>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div class="pull-left" v-for="url of enterpriseSurveyImageUrls">
            <v-img :imgSrc="url"></v-img>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业负责人尽职调查表：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div class="pull-left" v-for="url of enterpriseChargerSurveyImageUrls">
            <v-img :imgSrc="url"></v-img>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">企业入库申请函：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-img :imgSrc="enterpriseShindImageUrl"></v-img>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">授权委托书：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-img :imgSrc="authorizationImageUrl"></v-img>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <label class="label_height">其他补充材料：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div class="pull-left" v-for="url of otherImageUrls">
            <v-img :imgSrc="url"></v-img>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vimg from '@/components/img/img';
import { DECLARE_GET_ENTERPRISE_ID } from '@/config/env';
import errInfo from '@/components/info/error';

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
  },
  components: {
    'v-img': vimg,
    'v-error-info': errInfo,
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
