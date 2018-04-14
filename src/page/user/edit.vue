<template>
  <div class="bs-example">
    <span class="t_nav">&#12288;更新帐号</span>
   <router-link :to="'/user/detail/'+$route.params.id"><button class="btn btnDelete" @click="mcancel">取消</button></router-link>
   <button v-show="isShowSubmit" type="button" class="btn js-ajax-submit" @click="submit">添加</button>
   <button v-show="!isShowSubmit" type="button" class="btn js-ajax-submit" disabled>添加</button>
    <br/>
    <br/>
    <br/>
    <div class="form-inline clearfix">
      <div class="form-group col-sm-1 txr">
          <label class="label_height">用户名：</label>
      </div>
      <div class="form-group col-sm-11 imb">
          <input type="text" class="form-control iw600"  placeholder="请输入用户名" v-model="name">
      </div>
      <div class="clearfix"></div>
      <div class="form-group col-sm-1 txr">
          <label class="label_height">密码：</label>
      </div>
      <div class="form-group col-sm-11 imb">
          <input type="text" class="form-control iw600"  placeholder="请输入密码" v-model="password">
      </div>
      <div class="clearfix"></div>
      <div class="form-group col-sm-1 txr">
          <label class="label_height">选择对象：</label>
      </div>
      <div class="form-group col-sm-11 imb">
        <select class="form-control" v-model="declarerId">
          <option value="">请选择</option>
	      <option v-for="item of targets" :value="item.id">{{item.name}}</option>
	    </select>
      </div>
      <div class="clearfix"></div>
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
      <div class="clearfix"></div>
	  <div class="form-group col-sm-1 txr">
	    <label class="label_height">操作历史：</label>
	  </div>
	  <div class="form-group col-sm-11 imb">
       <span  v-if="logs.length <= 0 " class="label_height">无</span>
       <p v-if="logs.length > 0 " class="label_height"><a>导出</a></p>
       <table v-if="logs.length > 0 " class="table table-bordered">
        <thead>
          <tr>
            <th>操作内容</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of logs">
            <td>{{item.content}}</td>
            <td>{{item.createTime}}</td>
          </tr>
        </tbody>
      </table>
	  </div>
    </div>
  </div>
</template>

<script>
import { DECLARE_GET_USER_ACOUNT_ID, DECLARE_GET_DECLARER_SIMPLE, DECLARE_PUT_USER_ACOUNT } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'userdetail',
  data() {
    return {
      isShowSubmit: true,
      id: '',
      declarer: '',
      declarerId: '',
      name: '',
      password: '',
      role: [],
      logs: [],
      targets: [],
      a: false,
      b: false,
      c: false,
    };
  },
  methods: {
    mcancel() {
      this.isShowName = true;
      this.isShowDeclarer = true;
      this.isShowPassword = true;
      this.isShowrole = true;
      this.init();
    },
    setRole() {
      this.role = [];
      if (this.a) {
        this.role.push('申报企业');
      }
      if (this.b) {
        this.role.push('企业列表');
      }
      if (this.c) {
        this.role.push('推荐列表');
      }
    },
    setDeclarer(el) {
      this.declarer = el.target.options[el.target.options.selectedIndex].innerHTML;
    },
    async init() {
      const rest = await this.$xhr('get', DECLARE_GET_DECLARER_SIMPLE);
      if (rest.data.success) {
        this.targets = rest.data.data;
      }
      const res = await this.$xhr('get', `${DECLARE_GET_USER_ACOUNT_ID}${this.$route.params.id}`);
      if (res.data.code === 0) {
        this.id = res.data.data.id;
        this.declarer = res.data.data.declarer;
        this.declarerId = res.data.data.declarerId;
        this.name = res.data.data.name;
        this.password = res.data.data.password;
        this.logs = res.data.data.logs;
        this.logs.forEach((o) => {
          o.createTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd');
        });
        if (res.data.data.role) {
          const role = [];
          res.data.data.role.split(',').forEach((d) => {
            if (d === '1') {
              role.push('申报企业');
              this.a = true;
            }
            if (d === '2') {
              role.push('企业列表');
              this.b = true;
            }
            if (d === '3') {
              role.push('推荐列表');
              this.c = true;
            }
          });
          this.role = role;
        }
      }
    },
    async submit() {
      const param = {};
      param.id = this.$route.params.id;
      param.name = this.name;
      param.password = this.password;
      param.declarerId = this.declarerId;
      param.function = [];
      param.function.push(this.a ? 1 : 0);
      param.function.push(this.b ? 2 : 0);
      param.function.push(this.c ? 3 : 0);
      const res = await this.$xhr('post', `${DECLARE_PUT_USER_ACOUNT}${this.$route.params.id}`, param);
      this.isShowSubmit = !this.isShowSubmit;
      if (res.data.code === 0) {
        sessionStorage.setItem('title', '帐号更新');
        sessionStorage.setItem('content', '更新成功');
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
    float: right;
    width: 120px;
    height: 35px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
    margin-right: 10px;
}
.btnDelete {
    float: right;
    width: 120px;
    height: 35px;
    margin: auto;
    color:#999;
    background: #fff;
    border:1px #999 solid;
}
</style>