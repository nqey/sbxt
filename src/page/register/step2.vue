<template>
  <div>
    <v-register-head :step="2"></v-register-head>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div class="step_more ">
      <div class="step_chunk ">
        <div v-if="reason" style="text-align: center;color: red;">
          <span class="glyphicon glyphicon-exclamation-sign"></span> <span style="position: relative;top:-1px;">{{reason}}</span>
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <label  class="col-sm-4 control-label">姓 名：</label>
            <div class="col-sm-3">
              <input type="email" class="form-control" placeholder="请输入姓名" v-model="name">
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label">身份证号码：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" placeholder="请输入身份证号码" v-model="idNumber" @blur="validate">
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label">身份证照片：</label>
            <div class="col-sm-8">
              <small class="callout label_height">请按照示例上传证件照片；支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
              <br/>
              <small class="callout-red label_height">请上传本人真实身份证，否则审核不通过。</small>
              <div class="clearfix"></div>
              <div class="pull-left" style="width: 200px;margin-right: 30px;">
                <v-multiple-upload len="1" :imgSrc="initFrontUrl" uploadid="upload2" title="上传正面" @acceptData="frontUrl"></v-multiple-upload>
              </div>
              <div class="pull-left" style="width: 200px;">
                <v-multiple-upload len="1" :imgSrc="initBackUrl" uploadid="upload3" title="上传背面" @acceptData="backUrl"></v-multiple-upload>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label">常住地址：</label>
            <div class="col-sm-5">
              <v-area :areacode="areacode" @acceptData="setLiveAddress"></v-area>
              <input type='text' class='form-control iw' placeholder='请输入详细地址' v-model="address">
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label">选择申请区域：</label>
            <div class="col-sm-5">
              <span class="label_height" v-show="$route.params.type === '2'">{{ organizAddress }}</span>
              <v-apply-area v-show="$route.params.type === '1'" @acceptData="setApplyAddress"></v-apply-area>&#12288;
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label">推荐人工号：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" placeholder="推荐人工号" v-model="recommendOrgnizPhone">
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label">企业全称：</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" placeholder="请输入您的企业主体全称；例如：四川中新华搜信息技术有限公司；" v-model="enterpriseName">
              <br/>
              <br/>
              <small style="color: #999">申请申报机构必须是以公司的名义进行申请，拒绝个人申请。</small>
            </div>
          </div>
          <div class="form-group">
            <label  class="col-sm-4 control-label"></label>
            <div class="col-sm-5">
              <button v-show="isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" @click="submit">提交</button>
              <button v-show="!isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" disabled>提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import multipleUpload from '@/components/upload/multipleUpload';
import area from '@/components/area/area';
import registerHead from '@/components/header/registerHead';
import applyArea from '@/components/area/applyArea';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';
import { DECLARE_PUT_BASEINFO, DECLARE_GET_BASEINFO } from '@/config/env';

export default {
  name: 'step2',
  data() {
    return {
      showImg: false,
      imgSrc: '',
      name: '',
      idNumber: '',
      idFrontUrl: '',
      initFrontUrl: '',
      idBackUrl: '',
      initBackUrl: '',
      address: '',
      liveAddress: '',
      applyAddress: '',
      recommendOrgnizPhone: '',
      enterpriseName: '',
      organizAddress: '',
      areacode: '',
      isShowSubmit: true,
      list: [],
      errMsg: [],
      infoTimer: null,
      reason: null,
    };
  },
  components: {
    'v-multiple-upload': multipleUpload,
    'v-area': area,
    'v-register-head': registerHead,
    'v-apply-area': applyArea,
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
    async submit() {
      this.validate2();
      const param = {};
      param.name = this.name;
      param.idNumber = this.idNumber;
      param.idFrontUrl = this.idFrontUrl;
      param.idBackUrl = this.idBackUrl;
      param.recommendOrgnizPhone = this.recommendOrgnizPhone || null;
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
      this.isShowSubmit = !this.isShowSubmit;
      const res = await this.$http.post(DECLARE_PUT_BASEINFO, param);
      if (res.success) {
        this.$router.push('/step3');
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
      this.name = res.data.name;
      this.idNumber = res.data.idNumber;
      this.idFrontUrl = res.data.idFrontUrl;
      this.idBackUrl = res.data.idBackUrl;
      this.initFrontUrl = res.data.idFrontUrl;
      this.initBackUrl = res.data.idBackUrl;
      this.recommendName = res.data.recommentName;
      this.recommendOrgnizId = res.data.recommendOrgnizId;
      this.recommendOrgnizType = res.data.recommendOrgnizType;
      this.enterpriseName = res.data.organizName;
      this.liveAddress = res.data.liveAddress;
      this.address = res.data.address;
      this.applyAddress = res.data.applyAddress;
      this.organizAddress = res.data.organizAddress;
      this.areacode = `${res.data.liveProvice},${res.data.liveCity},${res.data.liveDistrict}`;
      this.reason = res.data.reason;
    }
  },
};
</script>

<style lang="scss" scoped>
.step_more{padding: 250px 60px 50px;background: #f6f7fb;}
.step_chunk{ background:#fff; padding: 40px 40px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
</style>