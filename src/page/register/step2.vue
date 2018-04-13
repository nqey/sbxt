<template>
  <div>
    <v-register-head :step="2"></v-register-head>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div>
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
          <div class="form-inline clearfix">
              <div class="form-group col-sm-5 txr clearfix">
                <label class="label_height">姓 名：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                <input type="text" class="form-control iw" placeholder="请输入姓名" v-model="name">
              </div>
              <div class="form-group col-sm-5 txr clearfix">
                <label class="label_height">身份证号码：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                <input type="text" class="form-control iw" placeholder="请输入身份证号码" v-model="idNumber" @blur="validate">
              </div>
              <div class="form-group col-sm-5 txr clearfix">
                <label class="label_height">身份证照片：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                <small class="info2 label_height">请按照示例上传证件照片；支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
                <br/>
                <small class="info label_height">请上传本人真实身份证，否则审核不通过。</small>
                <div class="clearfix"></div>
                <div class="pull-left" style="width: 200px;margin-right: 30px;">
                  <v-multiple-upload len="1" uploadid="upload1" title="上传正面" :imgSrc="idFrontUrl" @acceptData="frontUrl"></v-multiple-upload len="1">
                </div>
                <div class="pull-left" style="width: 200px;">
                  <v-multiple-upload len="1" uploadid="upload2" title="上传背面" :imgSrc="idBackUrl" @acceptData="backUrl"></v-multiple-upload len="1">
                </div>
              </div>
              <div class="form-group col-sm-5 txr clearfix">
                <label class="label_height">常住地址：</label>
              </div>
              <div class="col-sm-7 imb">
                <v-geo-area :areacode="areacode" @acceptData="setLiveAddress"></v-geo-area>
                <div class='mt'>
                  <input type='text' class='form-control iw' placeholder='请输入详细地址' v-model="address">
                </div>
              </div>
              <div class="form-group col-sm-5 txr clearfix">
                <label class="label_height">选择申请区域：</label>
              </div>
              <div class="col-sm-7 imb">
                <span class="label_height" v-show="$route.params.type === '2'">{{ organizAddress }}</span>
                <v-app-area v-show="$route.params.type === '1'" @acceptData="setApplyAddress"></v-app-area>&#12288;
              </div>
              <div class="form-group col-sm-5 txr clearfix">
                <label class="label_height">推荐机构：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                <input type="text" @input="showRecommendName" class="form-control iw600" placeholder="请输入推荐机构" v-model="recommendName">
                <div class="bdsug" v-show="list.length > 0">
                  <ul>
                  <li v-for="(item, index) of list" @click="setRecommendName(index)">{{item.name}}</li>
                  </ul>
                </div>
              </div>
              <div class="form-group col-sm-5 txr clearfix">
                <label class="label_height">企业全称：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                <input type="text" class="form-control iw600" placeholder="例如:四川中华搜信息技术有限公司" v-model="enterpriseName">
              </div>
              <div class="form-group col-sm-5 txr clearfix">
              </div>
              <div class="form-group col-sm-7 imb">
                <button class="btn js-ajax-submit" @click="submit">提交</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import multipleUpload from '@/components/upload/multipleUpload';
import vGeoArea from '@/components/reegionalCascade/geoArea';
import registerHead from '@/components/header/registerHead';
import apparea from '@/components/reegionalCascade/appArea';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';
import { DECLARE_PUT_BASEINFO, DECLARE_GET_RECOMMEND_ORGANIZ, DECLARE_GET_BASEINFO } from '@/config/env';

export default {
  name: 'step2',
  data() {
    return {
      showImg: false,
      imgSrc: '',
      name: '',
      idNumber: '',
      idFrontUrl: '',
      idBackUrl: '',
      address: '',
      liveAddress: '',
      applyAddress: '',
      recommendName: '',
      recommendOrgnizId: '',
      recommendOrgnizType: '',
      enterpriseName: '',
      organizAddress: '',
      areacode: '',
      list: [],
      errMsg: [],
      infoTimer: null,
    };
  },
  components: {
    'v-multiple-upload': multipleUpload,
    'v-geo-area': vGeoArea,
    'v-register-head': registerHead,
    'v-app-area': apparea,
    'v-error-info': errInfo,
  },
  methods: {
    validate() {
      this.errMsg = [];
      // 生份证号码验证
      if (this.idNumber !== '' && !rules.cP.pattern.test(this.idNumber)) {
        this.errMsg.push(rules.cP.message);
      }
    },
    validate2() {
      this.validate();
      // 生份证号码验证
      if (this.idNumber === '') {
        this.errMsg.push(`${rules.nonEmpty}${rules.idNumber}`);
      }
      // 姓名验证
      if (this.name === '') {
        this.errMsg.push(`${rules.nonEmpty}${rules.name}`);
      }
      // 身份证照片正面
      if (this.idFrontUrl === '') {
        this.errMsg.push(`${rules.upload}${rules.idFrontUrl}`);
      }
      // 身份证照片背面
      if (this.idBackUrl === '') {
        this.errMsg.push(`${rules.upload}${rules.idBackUrl}`);
      }
      // 常住地址 详细地址
      if (this.address === '') {
        this.errMsg.push(`${rules.nonEmpty}${rules.address}`);
      }
      // 常住地址
      if (this.liveAddress === '') {
        this.errMsg.push(`${rules.select}${rules.liveAddress}`);
      }
      // 申请区域
      if (this.applyAddress === '') {
        this.errMsg.push(`${rules.select}${rules.applyAddress}`);
      }
      // // 推荐机构验证
      // if (this.recommendOrgnizId === '') {
      //   this.errMsg.push(`${rules.nonEmpty}${rules.ecommendOrgniz}`);
      // }
      // 企业全称
      if (this.enterpriseName === '') {
        this.errMsg.push(`${rules.nonEmpty}${rules.enterpriseName}`);
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
    setApplyAddress(d) {
      this.applyAddress = d;
    },
    setRecommendName(index) {
      this.recommendName = this.list[index].name;
      this.recommendOrgnizId = this.list[index].id;
      this.recommendOrgnizType = this.list[index].type;
      this.list = [];
    },
    async showRecommendName() {
      const res = await this.$xhr('get', `${DECLARE_GET_RECOMMEND_ORGANIZ}${this.recommendName}`);
      if (res.data.code === 0) {
        this.list = res.data.data;
      }
    },
    async submit() {
      this.validate2();
      const param = {};
      param.name = this.name;
      param.idNumber = this.idNumber;
      param.idFrontUrl = this.idFrontUrl;
      param.idBackUrl = this.idBackUrl;
      param.recommendOrgnizId = this.recommendOrgnizId;
      param.recommendOrgnizType = this.recommendOrgnizType;
      param.enterpriseName = this.enterpriseName;
      param.liveAddress = this.liveAddress;
      param.address = this.address;
      if (this.$route.params.type === '1') {
        param.applyAddress = this.applyAddress;
      }
      if (this.errMsg.length !== 0) {
        clearTimeout(this.infoTimer);
        this.infoTimer = setTimeout(() => { this.errMsg = []; }, 3000);
        return;
      }
      const res = await this.$xhr('post', DECLARE_PUT_BASEINFO, param);
      if (res.data.code === 0) {
        this.$router.push('/step3');
      }
    },
  },
  async mounted() {
    if (this.$route.params.type === '1') {
      return;
    }
    const res = await this.$xhr('get', DECLARE_GET_BASEINFO);
    if (res.data.code === 0) {
      this.name = res.data.data.name;
      this.idNumber = res.data.data.idNumber;
      this.idFrontUrl = res.data.data.idFrontUrl;
      this.idBackUrl = res.data.data.idBackUrl;
      this.recommendName = res.data.data.recommentName;
      this.recommendOrgnizId = res.data.data.recommendOrgnizId;
      this.recommendOrgnizType = res.data.data.recommendOrgnizType;
      this.enterpriseName = res.data.data.organizName;
      this.liveAddress = res.data.data.liveAddress;
      this.address = res.data.data.address;
      this.applyAddress = res.data.data.applyAddress;
      this.organizAddress = res.data.data.organizAddress;
      this.areacode = `${res.data.data.liveProvice},${res.data.data.liveCity},${res.data.data.liveDistrict}`;
      if (res.data.data.reason) {
        this.errMsg.push(res.data.data.reason);
      }
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
.info {
  color: #ac2925;
}
.info2 {
  color: #999;
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
  line-height: 35px;
}
.imb {
  margin-bottom: 30px;
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
.mt {
  margin-top: 30px;
}
</style>