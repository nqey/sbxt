<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div class="index_more">
      <div class="index_chunk">
      <div class="t_nav">&#12288;添加帐号</div>
      <hr>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-2 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-10 imb">
            <input type="text" class="form-control iw600"  placeholder="请输入用户名" v-model="name">
        </div>
        <div class="form-group col-sm-2 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-10 imb">
            <input type="text" class="form-control iw600"  placeholder="请输入密码" v-model="password">
        </div>
        <div class="form-group col-sm-2 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <select class="form-control" v-model="declarerId">
            <option value="">请选择</option>
  		      <option v-for="item of targets" :value="item.id">{{item.name}}</option>
  		    </select>
        </div>
        <div class="form-group col-sm-2 txr">
            <label class="label_height">选择功能：</label>
        </div>
        <div class="form-group col-sm-10 imb qxgl">
         
            <label>
            <input type="checkbox" v-model="a"/> 企业申报  
            </label>
           <label>
            <input type="checkbox" v-model="b"/> 企业列表  
           </label>
            <label>
            <input type="checkbox" v-model="c"/> 推荐列表  
          </label>
        </div>
          <div class="form-group col-sm-2 txr">
          </div>
          <div class="form-group col-sm-10 imb">
              <button v-show="isShowSubmit" type="button" class="btn btn-success" @click="submit" style="height: 35px;">添加</button>
              <button v-show="!isShowSubmit" type="button" class="btn btn-success" disabled style="height: 35px;">添加</button>
          </div>
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
      if (!this.password) {
        this.errMsg.push('请输入密码');
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

.index_more{background: #f6f7fb;
    position: absolute;
    height: 100%;
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
  width:450px;
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
.qxgl label{ display: block; background: #f5f9fc; padding:10px 15px; width:450px; border-radius: 5px; margin-bottom: 15px;}
.qxgl label input{ float: right; }
</style>
