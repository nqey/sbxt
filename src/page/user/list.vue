<template>
  <div>
    <div class="bs-example">
      <span class="t_nav">&#12288;帐号列表</span>
      <br/>
      <br/>
      <br/>
      <div v-show="lists.length > 0">
        <table class="table table-bordered">
            <thead>
              <tr>
                <th>姓名</th>
                <th>帐号</th>
                <!-- <th>密码</th> -->
                <th>权限</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of lists">
                <td>{{item.declarerName}}</td>
                <td>{{item.acount}}</td>
                <!-- <td>{{item.password}}</td> -->
                <td>{{item.role}}</td>
                <td>
                  <router-link :to="'/user/detail/1/'+item.id">查看</router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <v-pagination :page="pages" @nextPage="search"></v-pagination>
          <div style="clear: both;"></div>
        </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination';
import { DECLARE_GET_USER_ACOUNT, DECLARE_GET_USER_ACOUNT_COUNT } from '@/config/env';

export default {
  name: 'userlist',
  data() {
    return {
      showImg: false,
      lists: [],
      page: 1,
      rows: 10,
      pages: 0,
    };
  },
  methods: {
    async search(page) {
      const param = {};
      if (!page) {
        param.page = this.page;
      } else {
        param.page = page;
      }
      param.rows = this.rows;
      const res = await this.$xhr('get', DECLARE_GET_USER_ACOUNT, param);
      if (res.data.code === 0) {
        this.lists = res.data.data;
        this.lists.forEach((o) => {
          const role = [];
          if (o.role) {
            o.role.split(',').forEach((d) => {
              if (d === '1') {
                role.push('申报企业');
              }
              if (d === '2') {
                role.push('企业列表');
              }
              if (d === '3') {
                role.push('推荐列表');
              }
            });
            o.role = role.join(',');
          }
        });
      }
      const res2 = await this.$xhr('get', DECLARE_GET_USER_ACOUNT_COUNT);
      if (res2.data.success) {
        this.pages = Math.ceil(res2.data.data / param.rows);
      }
    },
  },
  components: {
    'v-pagination': pagination,
  },
  mounted() {
    this.search(1);
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
