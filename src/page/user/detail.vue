<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;帐号详情</span>
      <span v-show="$route.params.type === '1'">
        <button class="btn btnDelete" @click="mdelete">删除</button>
        <router-link :to="'/user/detail/2/'+$route.params.id"><button class="btn js-ajax-submit">修改</button></router-link>
      </span>
      <span v-show="$route.params.type === '2'">
        <router-link :to="'/user/detail/1/'+$route.params.id"><button class="btn btnDelete" @click="mcancel">取消</button></router-link>
        <button @click="submit" class="btn js-ajax-submit">保存</button>
      </span>
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-1 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <div v-show="isShowName">
              <span class="label_height">{{name}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editName"></span>
            </div>
            <div v-show="!isShowName">
              <input type="text" class="form-control iw"  placeholder="请输入用户名" v-model="name">
              <span class="glyphicon glyphicon-floppy-saved" @click="editName"></span>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="isShowPassword">
            <span class="label_height">{{password}}&#12288;&#12288;</span>
            <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editPassword"></span>
          </div>
          <div v-show="!isShowPassword">
            <input type="text" class="form-control iw600"  placeholder="请输入密码" v-model="password">
            <span class="glyphicon glyphicon-floppy-saved" @click="editPassword"></span>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-11 imb">
            <div v-show="isShowDeclarer">
              <span class="label_height">{{declarer}}&#12288;&#12288;</span>
              <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editDeclarer"></span>
            </div>
            <div v-show="!isShowDeclarer">
              <select class="form-control" @change="setDeclarer($event)" v-model="declarerId">
                <option>请选择</option>
                <option v-for="item of targets" :value="item.id">{{item.name}}</option>
              </select>
              <span class="glyphicon glyphicon-floppy-saved" @click="editDeclarer"></span>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
            <label class="label_height">权限功能：</label>
        </div>
        <div class="form-group col-sm-11 imb">
          <div v-show="isShowrole">
            <span class="label_height" v-for="r of role">{{r}}&#12288;&#12288;&#12288;</span>
            <span v-show="$route.params.type === '2'" class="glyphicon glyphicon-edit" @click="editRole"></span>
          </div>
          <div v-show="!isShowrole">
            <input type="checkbox" @change="setRole" v-model="a"/> 企业申报&#12288;&#12288;&#12288;<span class="glyphicon glyphicon-floppy-saved" @click="editRole"></span>
            <br/>
            <input type="checkbox" @change="setRole" v-model="b"/> 企业列表  
            <br/>
            <input type="checkbox" @change="setRole" v-model="c"/> 推荐列表  
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-1 txr">
           <label class="label_height">操作历史：</label>
        </div>
        <div class="form-group col-sm-11 imb">
           <span  v-show="logs.length <= 0 " class="label_height">无</span>
           <p v-show="logs.length > 0 " class="label_height"><a>导出</a></p>
           <table v-show="logs.length > 0 " class="table table-bordered">
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
</template>

<script>
import { DECLARE_GET_USER_ACOUNT_ID, DECLARE_GET_DECLARER_SIMPLE, DECLARE_PUT_USER_ACOUNT,
 DECLARE_DELETE_USER_ACOUNT_ID } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'userdetail',
  data() {
    return {
      isShowName: true,
      isShowPassword: true,
      isShowrole: true,
      isShowDeclarer: true,
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
    editName() {
      this.isShowName = !this.isShowName;
    },
    editDeclarer() {
      this.isShowDeclarer = !this.isShowDeclarer;
    },
    editPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    editRole() {
      this.isShowrole = !this.isShowrole;
    },
    mcancel() {
      this.isShowName = true;
      this.isShowDeclarer = true;
      this.isShowPassword = true;
      this.isShowrole = true;
      this.init();
    },
    async mdelete() {
      const rest = await this.$xhr('post', `${DECLARE_DELETE_USER_ACOUNT_ID}${this.$route.params.id}`);
      if (rest.data.success) {
        setTimeout(() => { this.$router.push('/user/msg/2'); }, 1000);
      }
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
      if (res.data.code === 0) {
        setTimeout(() => { this.$router.push('/user/msg/2'); }, 1000);
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