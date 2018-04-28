<template>
  <div>
    <v-register-head :step="2"></v-register-head>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div>
      <div class="step_more">
       <div class="step_chunk">
        <div class="container">
           <div class="col-md-8 col-md-offset-2">
          <div class="form-inline clearfix">
              <div class="form-group col-sm-3 txr clearfix">
                <label class="label_height">姓 名：</label>
              </div>
              <div class="form-group col-sm-9 imb">
                <input type="text" class="form-control iw" placeholder="请输入姓名" v-model="name">
              </div>
              <div class="form-group col-sm-3 txr clearfix">
                <label class="label_height">身份证号码：</label>
              </div>
              <div class="form-group col-sm-9 imb">
                <input type="text" class="form-control iw" placeholder="请输入身份证号码" v-model="idNumber" @blur="validate">
              </div>
              <div class="form-group col-sm-3 txr clearfix">
                <label class="label_height">身份证照片：</label>
              </div>
              <div class="form-group col-sm-9 imb">
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
              <div class="form-group col-sm-3 txr clearfix">
                <label class="label_height">常住地址：</label>
              </div>
              <div class="col-sm-9 imb">
                <v-area :areacode="areacode" @acceptData="setLiveAddress"></v-area>
                <div class='mt'>
                  <input type='text' class='form-control iw' placeholder='请输入详细地址' v-model="address">
                </div>
              </div>
              <div class="form-group col-sm-3 txr clearfix">
                <label class="label_height">选择申请区域：</label>
              </div>
              <div class="col-sm-9 imb">
                <span class="label_height" v-show="$route.params.type === '2'">{{ organizAddress }}</span>
                <v-apply-area v-show="$route.params.type === '1'" @acceptData="setApplyAddress"></v-apply-area>&#12288;
              </div>
              <div class="form-group col-sm-3 txr clearfix">
                <label class="label_height">推荐机构：</label>
              </div>
              <div class="form-group col-sm-9 imb">
                <input type="text" @keypress="showRecommendName($event)" @blur="hideRecommend" class="form-control iw600" placeholder="请输入推荐机构" v-model="recommendName">
                <br/>
                <br/>
                <small class="callout-red label_height">输入内容后回车查询推荐机构</small>
                <div class="bdsug" v-show="list.length > 0">
                  <ul>
                  <li v-for="(item, index) of list" @click="setRecommendName(index)">{{item.name}}</li>
                  </ul>
                </div>
              </div>
              <div class="form-group col-sm-3 txr clearfix">
                <label class="label_height">企业全称：</label>
              </div>
              <div class="form-group col-sm-9 imb">
                <input type="text" class="form-control iw600" placeholder="请输入您的企业主体全称；例如：四川中新华搜信息技术有限公司；" v-model="enterpriseName">
                <br/>
                <br/>
                <small style="color: #999">申请申报机构必须是以公司的名义进行申请，拒绝个人申请。</small>
              </div>
              <div class="form-group col-sm-3 txr clearfix">
              </div>
              <div class="form-group col-sm-9 imb">
                <button v-show="isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" @click="submit">提交</button>
                <button v-show="!isShowSubmit" type="button" class="btn btn-success" style="height: 35px;" disabled>提交</button>
              </div>
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
import area from '@/components/area/area';
import registerHead from '@/components/header/registerHead';
import applyArea from '@/components/area/applyArea';
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
      initFrontUrl: '',
      idBackUrl: '',
      initBackUrl: '',
      address: '',
      liveAddress: '',
      applyAddress: '',
      recommendName: '',
      recommendOrgnizId: '',
      recommendOrgnizType: '',
      enterpriseName: '',
      organizAddress: '',
      areacode: '',
      isShowSubmit: true,
      list: [],
      errMsg: [],
      infoTimer: null,
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
    setRecommendName(index) {
      this.recommendName = this.list[index].name;
      this.recommendOrgnizId = this.list[index].id;
      this.recommendOrgnizType = this.list[index].type;
      this.list = [];
    },
    hideRecommend() {
      setTimeout(() => { this.list = []; }, 500);
    },
    async showRecommendName(e) {
      if (e.keyCode === 13) {
        this.list = [];
        const res = await this.$xhr('get', `${DECLARE_GET_RECOMMEND_ORGANIZ}${this.recommendName}`);
        if (res.data.code === 0) {
          this.list = res.data.data;
        }
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
      param.recommendOrgnizName = this.recommendName;
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
      const res = await this.$xhr('post', DECLARE_PUT_BASEINFO, param);
      if (res.data.code === 0) {
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
    const res = await this.$xhr('get', DECLARE_GET_BASEINFO);
    if (res.data.code === 0) {
      this.name = res.data.data.name;
      this.idNumber = res.data.data.idNumber;
      this.idFrontUrl = res.data.data.idFrontUrl;
      this.idBackUrl = res.data.data.idBackUrl;
      this.initFrontUrl = res.data.data.idFrontUrl;
      this.initBackUrl = res.data.data.idBackUrl;
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
.step_more{    padding: 250px 60px 50px;background: #f6f7fb;}
.step_chunk{ background:#fff; padding: 40px 40px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
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
.iw {
  width: 85%;
}
.iw600 {
  width: 85%;
}
.imb {
  margin-bottom: 30px;
}
.mt {
  margin-top: 30px;
}
</style>