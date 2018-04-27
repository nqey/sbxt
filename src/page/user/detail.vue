<template>
  <div class="index_more">
      <div class="index_chunk">
    <div class="t_nav clearfix"><span>&#12288;帐号详情</span><div class="pull-right">
      <button v-show="isShowSubmit" type="button" class="btn btnDelete" @click="submit">删除</button>
      <button v-show="!isShowSubmit" type="button" class="btn btnDelete" disabled>删除</button>
      <router-link :to="'/user/edit/'+$route.params.id"><button class="btn js-ajax-submit">修改</button></router-link></div>
    </div>
    <hr>
      
      <br/>
      <br/>
      <br/>
      <div class="form-inline clearfix">
        <div class="form-group col-sm-2 txr">
            <label class="label_height">用户名：</label>
        </div>
        <div class="form-group col-sm-10 imb">
            <span class="label_height">{{name}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
            <label class="label_height">密码：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <span class="label_height">{{password}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
            <label class="label_height">选择对象：</label>
        </div>
        <div class="form-group col-sm-10 imb">
            <span class="label_height">{{declarer}}&#12288;&#12288;</span>
        </div>
        <div class="clearfix"></div>
        <div class="form-group col-sm-2 txr">
            <label class="label_height">权限功能：</label>
        </div>
        <div class="form-group col-sm-10 imb">
          <span class="label_height" v-for="r of role">{{r}}&#12288;</span>
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
</template>

<script>
import { DECLARE_GET_USER_ACOUNT_ID, DECLARE_GET_DECLARER_SIMPLE,
 DECLARE_DELETE_USER_ACOUNT_ID } from '@/config/env';
import { formatDate } from '@/config/utils';
import { MessageBox } from 'element-ui';

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
    submit() {
      MessageBox({
        title: '提示',
        message: '此操作将永久删除该数据, 是否继续?',
        showCancelButton: true,
        showConfirmButton: true,
        type: 'warning',
      }).then(async () => {
        this.isShowSubmit = !this.isShowSubmit;
        const rest = await this.$xhr('post', `${DECLARE_DELETE_USER_ACOUNT_ID}${this.$route.params.id}`);
        if (rest.data.success) {
          sessionStorage.setItem('title', '帐号删除');
          sessionStorage.setItem('content', '帐号删除成功');
          sessionStorage.setItem('content2', '');
          sessionStorage.setItem('content3', '');
          sessionStorage.setItem('alink', '');
          sessionStorage.setItem('blink', '/user/list');
          sessionStorage.setItem('clink', '');
          this.$router.push('/message');
        } else {
          this.isShowSubmit = !this.isShowSubmit;
        }
      }).catch(() => {
      });
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
.fc{ border-bottom: 1px solid #4786ff; color: #4786ff; }
.iw600 {
  width: 450px;
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