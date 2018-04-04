<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;申报官详情</span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-12 txc imb">
            <p class="err"><span class="glyphicon glyphicon-exclamation-sign"></span> 未通过原因:{{reason}}</p>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
          <img :src="cz"></img>
        </div>
        <div class="form-group col-sm-11 imb">
            <h4 style="display: inline-block;">{{name}}</h4>
             &#12288;<span class="glyphicon glyphicon-edit"></span>
            <br/>
            <br/>
            <span>手机号码：{{tellphone}}</span>
            &#12288;<span class="glyphicon glyphicon-edit"></span>
            <br/>
            <br/>
            <span>身份证号：{{idNumber}}   &#12288;<span class="glyphicon glyphicon-edit"></span>&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;考试分数：<span class="cscore">{{score}}</span>分</span>
        </div>
        <div class="clearfix"></div>
        <br/>
        <br/>
        <v-bigimg v-if="showImg" @hideViewImg="viewImg" :imgSrc="imgSrc"></v-bigimg>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">证件照片：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <v-reupload :imgSrc="abm" @acceptImgSrc="bigimg" uploadid="reup1"></v-reupload>
          <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
          <div style="position:absolute;width:100px;height:210px;top:100px;display: inline-block;text-align: center;">
            <span class="glyphicon glyphicon-exclamation-sign err"></span>
          </div>
        </div>
        <div class="clearfix"></div>
        <br/>
          <div class="form-group col-sm-1 txr">
              <label class="label_height">尽职调查表：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
            <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
        <div class="clearfix"></div>
        <br/>
          <div class="form-group col-sm-1 txr">
              <label class="label_height">承诺公函：</label>
          </div>
          <div class="form-group col-sm-11 imb">
            <v-commonimg :imgSrc="abm" @acceptImgSrc="bigimg"></v-commonimg>
            <v-commonimg :imgSrc="jze" @acceptImgSrc="bigimg"></v-commonimg>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upload';
import reupload from '@/components/upload/reUpload';
import bigImg from '@/components/bigImg';
import commonimg from '@/components/commonImg';
import cz from '@/assets/img/cz.jpg';
import abm from '@/assets/img/abm.jpg';
import jze from '@/assets/img/jze.jpg';

export default {
  name: 'officerDetail',
  data() {
    return {
      showImg: false,
      cz,
      abm,
      jze,
      name: '克里斯塔',
      tellphone: '13780546859',
      idNumber: '51018219900805XXXX',
      reason: '您的身份证号码与你的真实姓名不匹配，需要重新提交。',
      score: 86,
      portrait: '',
      idFrontUrl: 'gfasdf4s24df135asd',
      idBackUrl: 'gfasdf4s24df135asd',
      surveyImageUrl: 'gfasdf4s24df135asd',
      letterImageUrl: 'gfasdf4s24df135asd',
      state: '审核未通过',
    };
  },
  methods: {
    bigimg(src) {
      this.imgSrc = src;
      this.showImg = true;
    },
    viewImg() {
      this.showImg = false;
    },
  },
  components: {
    'v-upload': upload,
    'v-bigimg': bigImg,
    'v-commonimg': commonimg,
    'v-reupload': reupload,
  },
};
</script>

<style lang="scss" scoped>
.err {
  color: #ac2925;
}
.cscore {
  color: green;font-size: 18px;
}
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
.clear {

}
</style>