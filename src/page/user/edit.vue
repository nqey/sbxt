<template>
  <div>
    <v-error-info :errMsg="errMsg"></v-error-info>
    <div class="index_more">
      <div class="index_chunk">
       
        <div class="t_nav clearfix"><span>&#12288;更新帐号</span><div class="pull-right">
      <router-link :to="'/user/detail/'+$route.params.id"><button class="btn btnDelete" @click="mcancel">取消</button></router-link>
     <button v-show="isShowSubmit" type="button" class="btn js-ajax-submit" @click="submit">保存</button>
     <button v-show="!isShowSubmit" type="button" class="btn js-ajax-submit" disabled>添加</button>
        </div>
      </div>
        <hr>
     
     
      <div class="form-inline clearfix">
        <div class="form-group col-sm-2 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-10 imb">
            <input type="text" class="form-control iw600"  placeholder="请输入用户名" v-model="name">
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-10 imb">
            <input type="text" class="form-control iw600"  placeholder="不能使用特殊字符，长度在8-10之间，不输入密码则不更新" v-model="password" @blur="validate">
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <select class="form-control" v-model="declarerId">
            <option value="">请选择</option>
  	      <option v-for="item of targets" :value="item.id">{{item.name}}</option>
  	    </select>
        </div>
        <div class="clearfix"></div>
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
            <input type="checkbox" v-model="c"/> 首页  
          </label>
        </div>
        <div class="clearfix"></div>
  	  <div class="form-group col-sm-2 txr">
  	    <label class="label_height">操作历史：</label>
  	  </div>
  	  <div class="form-group col-sm-10 imb">
         <span  v-if="logs.length <= 0 " class="label_height">无</span>
         <p v-if="logs.length > 0 " class="label_height"><a class="fc">导出</a></p>
         <table v-if="logs.length > 0 " class="table">
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
  </div>
</div>
</template>

<script>
import { DECLARE_GET_USER_ACOUNT_ID, DECLARE_GET_DECLARER_SIMPLE, DECLARE_PUT_USER_ACOUNT } from '@/config/env';
import { formatDate } from '@/config/utils';
import errInfo from '@/components/info/error';
import rules from '@/config/rules';

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
      errMsg: [],
      infoTimer: null,
      a: false,
      b: false,
      c: false,
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
      // 密码强度验证
      if (this.password !== '' && !rules.pPattern.pattern.test(this.password)) {
        this.errMsg.push(rules.pPattern.message);
      }
    },
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
        this.role.push('首页');
      }
    },
    setDeclarer(el) {
      this.declarer = el.target.options[el.target.options.selectedIndex].innerHTML;
    },
    async init() {
      const rest = await this.$http.get(DECLARE_GET_DECLARER_SIMPLE);
      if (rest.data.success) {
        this.targets = rest.data.data;
      }
      const res = await this.$http.get(`${DECLARE_GET_USER_ACOUNT_ID}${this.$route.params.id}`);
      if (res.success) {
        this.id = res.data.id;
        this.declarer = res.data.declarer;
        this.declarerId = res.data.declarerId;
        this.name = res.data.name;
        // this.password = res.data.password;
        this.logs = res.data.logs;
        this.logs.forEach((o) => {
          o.createTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd hh:mm:ss');
        });
        if (res.data.role) {
          const role = [];
          res.data.role.split(',').forEach((d) => {
            if (d === '1') {
              role.push('申报企业');
              this.a = true;
            }
            if (d === '2') {
              role.push('企业列表');
              this.b = true;
            }
            if (d === '3') {
              role.push('首页');
              this.c = true;
            }
          });
          this.role = role;
        }
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
      param.id = this.$route.params.id;
      param.name = this.name;
      param.password = this.password;
      param.declarerId = this.declarerId;
      param.function = [];
      param.function.push(this.a ? 1 : 0);
      param.function.push(this.b ? 2 : 0);
      param.function.push(this.c ? 3 : 0);
      const res = await this.$http.post(`${DECLARE_PUT_USER_ACOUNT}${this.$route.params.id}`, param);
      this.isShowSubmit = !this.isShowSubmit;
      if (res.success) {
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
  height: 100%;
  padding-bottom: 200px;
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
table{ border:1px solid #eee; }
.table>thead>tr>th{ border-bottom: none; }
.table>thead>tr>th,.table>tbody>tr>td,.table>tbody>tr>th{ padding: 15px; }
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
  width: 450px;
}
.fc{ border-bottom: 1px solid #4786ff; color: #4786ff; }
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
.qxgl label{ display: block; background: #f5f9fc; padding:10px 15px; width:450px; border-radius: 5px; margin-bottom: 15px;}
.qxgl label input{ float: right; }
</style>