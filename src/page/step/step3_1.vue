<template>
  <div>
    <v-registerhead :step="3"></v-registerhead>
    <div >
      <div class="col-sm-12 container">
        <div class="col-sm-12 bs-example">
          <div class="form-inline  clearfix">
              <div class="form-group col-sm-12 txc imb">
                <p class="err"><span  v-show="!isShowCard" class="glyphicon glyphicon-exclamation-sign"></span> 未通过原因: 您的身份证号码与你的真实姓名不匹配，需要重新提交。</p>
                <!-- <p><span  v-show="!isShowCard" class="glyphicon glyphicon-exclamation-sign err"></span></p> -->
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">姓 名：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                <input v-show="!isShowName" type="text" class="form-control iw isuccess" name="authCode" placeholder="请输入姓名">
                <span  v-show="!isShowName" class="glyphicon glyphicon-ok-circle success"></span>
                <input v-show="isShowName" type="text" class="form-control iw ierr" name="authCode" placeholder="请输入姓名">
                <span  v-show="isShowName" class="glyphicon glyphicon-exclamation-sign err"></span>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">身份证号码：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                <input v-show="isShowCard" type="text" class="form-control iw isuccess" name="authCode" placeholder="请输入身份证号码">
                <span  v-show="isShowCard" class="glyphicon glyphicon-ok-circle success"></span>
                <input v-show="!isShowCard" type="text" class="form-control iw ierr" name="authCode" placeholder="请输入身份证号码">
                <span  v-show="!isShowCard" class="glyphicon glyphicon-exclamation-sign err"></span>
              </div>
              <v-imgenlarge v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></v-imgenlarge>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">身份证照片：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <v-upload @clickbg="enlarge"></v-upload>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">常住地址：</label>
              </div>
              <div class="col-sm-7 imb">
                  <v-geoarea></v-geoarea>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">选择申请区域：</label>
              </div>
              <div class="col-sm-7 imb">
                  <v-apparea></v-apparea>
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">推荐机构：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input type="text" class="form-control iw600" name="authCode" placeholder="请输入推荐机构">
              </div>
              <div class="form-group col-sm-5 txr">
                  <label class="label_height">企业全称：</label>
              </div>
              <div class="form-group col-sm-7 imb">
                  <input type="text" class="form-control iw600" name="authCode" placeholder="例如:四川中华搜信息技术有限公司">
              </div>
              <div class="form-group col-sm-5 txr">
              </div>
              <div class="form-group col-sm-7 imb">
                  <button class="btn js-ajax-submit">提交</button>
              </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import upload from '@/components/upload';
import geoarea from '@/components/geoArea';
import registerHead from '@/components/registerHead';
import imgenlarge from '@/components/imgEnlarge';
import apparea from '@/components/appArea';

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
      imgSrc: '',
      isShowCard: false,
      isShowName: false,
    };
  },
  components: {
    'v-upload': upload,
    'v-geoarea': geoarea,
    'v-registerhead': registerHead,
    'v-imgenlarge': imgenlarge,
    'v-apparea': apparea,
  },
  methods: {
    enlarge(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.err {
  color: #ac2925;
}
.success {
  color: #4cae4c;
}
.ierr {
  border: 1px solid #ac2925
}
.isuccess {
  border: 1px solid #4cae4c
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
</style>