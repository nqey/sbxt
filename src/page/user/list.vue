<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;帐号列表</span>
      <br/>
      <br/>
      <br/>
      <table class="table table-bordered">
          <thead>
            <tr>
              <th>姓名</th>
              <th>帐号</th>
              <th>密码</th>
              <th>权限</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of lists">
              <th scope="row">{{item.name}}</th>
              <td>{{item.acount}}</td>
              <td style="color: #ac2925;">{{item.password}} <span class="glyphicon glyphicon-question-sign"></span></td>
              <td>{{item.role}}</td>
              <td>
                <router-link to="/userdetail">查看</router-link>
                <a>删除</a> 
                <router-link to="/useredit">修改</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <v-pagination :page="pages" @nextPage="search"></v-pagination>
        <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upload';
import bigImg from '@/components/bigImg';
import pagination from '@/components/pagination';

export default {
  name: 'userlist',
  data() {
    return {
      showImg: false,
      lists: [],
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
    search() {
      this.lists = [
        {
          id: '用户id',
          name: '用户名',
          acount: '账户',
          password: '密码',
          role: '权限',
        },
        {
          id: '用户id',
          name: '用户名',
          acount: '账户',
          password: '密码',
          role: '权限',
        },
      ];
    },
  },
  components: {
    'v-upload': upload,
    'v-bigimg': bigImg,
    'v-pagination': pagination,
  },
  mounted() {
    this.search();
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
