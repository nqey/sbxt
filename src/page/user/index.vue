<template>
  <div>
    <v-head></v-head>
    <v-lmenu></v-lmenu>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;添加帐号</span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600" name="authCode" placeholder="请输入用户名">
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600" name="authCode" placeholder="请输入密码">
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <select class="form-control">
		      <option>请选择</option>
		      <option>1</option>
		      <option>2</option>
		      <option>3</option>
		      <option>4</option>
		      <option>5</option>
		    </select>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择功能：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="checkbox"/> 企业申报  
            <br/>
            <input type="checkbox"/> 企业列表  
            <br/>
            <input type="checkbox"/> 推荐列表  
        </div>
          <div class="form-group col-sm-1 txr">
          </div>
          <div class="form-group col-sm-11 imb">
              <button class="btn js-ajax-submit">添加</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import vhead from '@/components/header';
import lmenu from '@/components/leftMenu';
import upload from '@/components/upload';
import bigImg from '@/components/bigImg';

export default {
  name: 'search',
  data() {
    return {
      showImg: false,
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
    'v-head': vhead,
    'v-lmenu': lmenu,
    'v-upload': upload,
    'v-bigimg': bigImg,
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
</style>
