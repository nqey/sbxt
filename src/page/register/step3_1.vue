<template>
  <div>
    <v-registerhead :step="3"></v-registerhead>
    <div>
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
          <div class="form-inline clearfix">
              <div class="form-group col-sm-12 txc imb">
                <p class="err"><span class="glyphicon glyphicon-exclamation-sign"></span> 未通过原因: {{errMsg}}</p>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">姓 名：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input type="text" class="form-control iw" placeholder="请输入姓名" v-model="name">
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">身份证号码：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input type="text" class="form-control iw" placeholder="请输入身份证号码" v-model="idNumber">
              </div>
              <v-bigimg v-if="showImg" @hideViewImg="viewImg" :imgSrc="imgSrc"></v-bigimg>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">身份证照片：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <small class="info2 label_height">请按照示例上传证件照片；支持格式：jpg、bmp、png、gif格式照片，大小不超2M。</small>
                  <p></p>
                  <small class="info label_height">请上传本人真实身份证，否则审核不通过。</small>
                  <div class="clearfix"></div>
                  <v-upload uploadid="upload1" text="上传正面" @acceptData="frontUrl" :imgUrl="idFrontUrl"></v-upload>
                  <v-upload uploadid="upload2" text="上传背面" @acceptData="backUrl" :imgUrl="idBackUrl"></v-upload>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">常住地址：</label>
              </div>
              <div class="col-sm-7 imb">
                  <v-geoarea @acceptData="makeData"></v-geoarea>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">选择申请区域：</label>
              </div>
              <div class="col-sm-7 imb">
                  <v-apparea @acceptData="makeData"></v-apparea>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">推荐机构：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input type="text" @input="showRecommendName" class="form-control iw600" placeholder="请输入推荐机构" v-model="recommendName">
                  <div class="bdsug" v-show="isShowRecommendName">
                   <ul>
                    <li v-for="(item, index) of list" @click="setRecommendName(index)">{{item.name}}</li>
                   </ul>
                 </div>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">企业全称：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input type="text" class="form-control iw600" placeholder="例如:四川中华搜信息技术有限公司" v-model="enterpriseName">
              </div>
              <div class="form-group col-sm-5 txr">
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
import upload from '@/components/upload/idCardUpload';
import geoarea from '@/components/reegionalCascade/geoArea';
import registerHead from '@/components/registerHead';
import bigImg from '@/components/bigImg';
import apparea from '@/components/reegionalCascade/appArea';

export default {
  name: 'step2',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      showImg: false,
      isShowRecommendName: false,
      imgSrc: '',
      name: '',
      idNumber: '',
      idFrontUrl: '',
      idBackUrl: '',
      recommendName: '',
      recommendOrgnizId: '',
      recommendOrgnizType: '',
      enterpriseName: '',
      errMsg: '您的身份证号码与你的真实姓名不匹配，需要重新提交。',
      obj: {},
      list: [],
    };
  },
  components: {
    'v-upload': upload,
    'v-geoarea': geoarea,
    'v-registerhead': registerHead,
    'v-bigimg': bigImg,
    'v-apparea': apparea,
  },
  methods: {
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
    frontUrl(d) {
      this.idFrontUrl = d;
    },
    backUrl(d) {
      this.idBackUrl = d;
    },
    makeData(d) {
      this.obj = Object.assign(this.obj, d);
    },
    setRecommendName(index) {
      this.recommendName = this.list[index].name;
      this.isShowRecommendName = false;
      this.recommendOrgnizId = this.list[index].id;
      this.recommendOrgnizType = this.list[index].type;
    },
    showRecommendName() {
      // get http todo
      this.list = [
        {
          id: '001',
          type: '1',
          name: '四川中新华搜信息技术有限公司1',
        },
        {
          id: '002',
          type: '2',
          name: '四川中新华搜信息技术有限公司2',
        },
        {
          id: '003',
          type: '3',
          name: '四川中新华搜信息技术有限公司3',
        },
      ];
      this.isShowRecommendName = true;
    },
    submit() {
      this.obj.name = this.name;
      this.obj.idNumber = this.idNumber;
      this.obj.idFrontUrl = this.idFrontUrl;
      this.obj.idBackUrl = this.idBackUrl;
      this.obj.recommendOrgnizId = this.recommendOrgnizId;
      this.obj.recommendOrgnizType = this.recommendOrgnizType;
      this.obj.enterpriseName = this.enterpriseName;
      // console.log(this.obj);
      this.$router.push('/step4');
    },
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
.err {
  color: #ac2925;
}
</style>