<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div class="bs-example">
      <p class="t_nav">&#12288;添加帐号</p>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600"  placeholder="请输入用户名" v-model="name">
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="text" class="form-control iw600"  placeholder="请输入密码" v-model="password">
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <select class="form-control" v-model="declarerId">
            <option value="">请选择</option>
  		      <option v-for="item of targets" :value="item.id">{{item.name}}</option>
  		    </select>
        </div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择功能：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <input type="checkbox" v-model="a"/> 企业申报  
            <br/>
            <input type="checkbox" v-model="b"/> 企业列表  
            <br/>
            <input type="checkbox" v-model="c"/> 推荐列表  
        </div>
          <div class="form-group col-sm-1 txr">
          </div>
          <div class="form-group col-sm-11 imb">
              <button v-show="isShowSubmit" type="button" class="btn btn-success" @click="submit">添加</button>
              <button v-show="!isShowSubmit" type="button" class="btn btn-success" disabled>添加</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DECLARE_GET_DECLARER_SIMPLE, DECLARE_POST_USER_ACOUNT } from '@/config/env';
import errInfo from '@/components/info/error';

export default {
  name: 'user',
  data() {
    return {
      isShowSubmit: true,
      name: '',
      password: '',
      declarerId: '',
      function: [],
      errMsg: [],
      infoTimer: null,
      a: '',
      b: '',
      c: '',
      showImg: false,
      targets: [],
    };
  },
  methods: {
    validate() {
      this.errMsg = [];
      if (!this.name) {
        this.errMsg.push('请输入用户名');
      }
      if (!this.declarerId) {
        this.errMsg.push('请选择对象');
      }
    },
    async submit() {
      this.validate();
      if (this.errMsg.length !== 0) {
        clearTimeout(this.infoTimer);
        this.infoTimer = setTimeout(() => { this.errMsg = []; }, 3000);
        return;
      }
      const param = {};
      param.name = this.name;
      param.password = this.password;
      param.declarerId = this.declarerId;
      param.function = [];
      param.function.push(this.a ? 1 : 0);
      param.function.push(this.b ? 2 : 0);
      param.function.push(this.c ? 3 : 0);
      const res = await this.$xhr('post', DECLARE_POST_USER_ACOUNT, param);
      this.isShowSubmit = !this.isShowSubmit;
      if (res.data.code === 0) {
        sessionStorage.setItem('title', '添加帐号');
        sessionStorage.setItem('content', '添加帐号成功');
        sessionStorage.setItem('content2', '');
        sessionStorage.setItem('content3', '');
        sessionStorage.setItem('alink', '');
        sessionStorage.setItem('blink', '/user/list');
        sessionStorage.setItem('clink', '');
        this.$router.push('/message');
      } else {
        this.isShowSubmit = !this.isShowSubmit;
      }
    },
    async init() {
      const res = await this.$xhr('get', DECLARE_GET_DECLARER_SIMPLE);
      if (res.data.code === 0) {
        this.targets = res.data.data;
      }
    },
  },
  components: {
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
</style>
