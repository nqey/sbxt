<template>
 <div class="index_more">
    <v-error-info :errMsg="errMsg"></v-error-info>
      <div class="index_chunk">
    <div class="t_nav">&#12288;企业详情</div>
      <hr/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-2 txr">
          <label class="label_height">企业全称：</label>
        </div>
        <div class="form-group col-sm-10">
          <span class="label_height">{{name}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">企业法人：</label>
        </div>
        <div class="form-group col-sm-10">
          <span class="label_height">{{charger}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">手机号码：</label>
        </div>
        <div class="form-group col-sm-10">
          <span class="label_height">{{cellphone}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">身份证号码：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <span class="label_height">{{idNumber}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">身份证照片：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <div class="pull-left" style="width: 200px;margin-right: 30px;">
            <v-img :imgSrc="idFrontUrl"></v-img>
          </div>
          <div class="pull-left" style="width: 200px;">
            <v-img :imgSrc="idBackUrl"></v-img>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">营业执照：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <v-img :imgSrc="licenseImageUrl"></v-img>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">生产许可证：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <v-img :imgSrc="productionImageUrl"></v-img>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">资金补贴申报表：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <div class="pull-left" v-for="url of capitalImageUrls">
            <v-img :imgSrc="url"></v-img>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">企业尽职调查表：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <div class="pull-left" v-for="url of enterpriseSurveyImageUrls">
            <v-img :imgSrc="url"></v-img>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">企业负责人尽职调查表：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <div class="pull-left" v-for="url of enterpriseChargerSurveyImageUrls">
            <v-img :imgSrc="url"></v-img>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">企业入库申请函：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <v-img :imgSrc="enterpriseShindImageUrl"></v-img>
        </div>
        <div class="clearfix" v-show="authorizationImageUrl"></div>
        <div class="form-group col-sm-2 txr" v-show="authorizationImageUrl">
          <label class="label_height">授权委托书：</label>
        </div>
        <div class="form-group col-sm-10 imb" v-show="authorizationImageUrl">
          <v-img :imgSrc="authorizationImageUrl"></v-img>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
          <label class="label_height">其他补充材料：</label>
        </div>
        <div class="form-group col-sm-10 imb">
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
      const res = await this.$http.get(`${DECLARE_GET_ENTERPRISE_ID}${id}`);
      if (res.success) {
        this.name = res.data.name;
        this.charger = res.data.charger;
        this.cellphone = res.data.cellphone;
        this.idNumber = res.data.idNumber;
        this.idFrontUrl = res.data.idFrontUrl;
        this.idBackUrl = res.data.idBackUrl;
        this.licenseImageUrl = res.data.licenseImageUrl;
        this.productionImageUrl = res.data.productionImageUrl;
        this.capitalImageUrl = res.data.capitalImageUrl;
        if (res.data.capitalImageUrl) {
          this.capitalImageUrls = res.data.capitalImageUrl.split(',');
        }
        this.enterpriseSurveyImageUrl = res.data.enterpriseSurveyImageUrl;
        if (res.data.enterpriseSurveyImageUrl) {
          this.enterpriseSurveyImageUrls = res.data.enterpriseSurveyImageUrl.split(',');
        }
        this.enterpriseChargerSurveyImageUrl = res.data.enterpriseChargerSurveyImageUrl;
        if (res.data.enterpriseChargerSurveyImageUrl) {
          this.enterpriseChargerSurveyImageUrls = res.data.enterpriseChargerSurveyImageUrl.split(',');
        }
        this.enterpriseShindImageUrl = res.data.enterpriseShindImageUrl;
        this.authorizationImageUrl = res.data.authorizationImageUrl;
        this.otherImageUrl = res.data.otherImageUrl;
        if (res.data.otherImageUrl) {
          this.otherImageUrls = res.data.otherImageUrl.split(',');
        }
        this.state = res.data.state;
        this.reason = res.data.reason;
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
