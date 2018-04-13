<template>
  <div class="bs-example">
    <span class="t_nav">&#12288;&#12288;推荐列表</span>
    <br/>
    <br/>
    <br/>
    <div v-show="lists.length > 0">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>机构名称</th>
            <th>负责人</th>
            <!-- <th>推荐人</th> -->
            <th>状态</th>
            <th>申报时间</th>
            <th>联系电话</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of lists">
            <td>{{item.name}}</td>
            <td>{{item.declarer}}</td>
            <!-- <td>{{item.recomer}}</td> -->
            <td v-show="item.reason" style="color: #ac2925;">{{item.state}} <span class="glyphicon glyphicon-question-sign"></span>{{item.reason}}</td>
            <td v-show="!item.reason">{{item.state}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.tellphone}}</td>
          </tr>
        </tbody>
      </table>
      <v-pagination :page="pages" @nextPage="search"></v-pagination>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination';
import { DECLARE_GET_RECOMMEND, DECLARE_GET_RECOMMEND_COUNT } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'recommendlist',
  data() {
    return {
      page: 1,
      rows: 20,
      lists: [],
      pages: 0,
      showImg: false,
    };
  },
  methods: {
    async search() {
      const param = {};
      param.page = this.page;
      param.rows = this.rows;
      const res = await this.$xhr('get', DECLARE_GET_RECOMMEND, param);
      if (res.data.code === 0) {
        this.lists = res.data.data;
        this.lists.forEach((o) => {
          if (o.state === 'create') {
            o.state = '添加';
          } else if (o.state === 'waitPending') {
            o.state = '待初审';
          } else if (o.state === 'waitUnPending') {
            o.state = '初审未通过';
          } else if (o.state === 'waitPended') {
            o.state = '初审通过';
          } else if (o.state === 'waitAudit') {
            o.state = '待审核';
          } else if (o.state === 'unpass') {
            o.state = '未通过';
          } else if (o.state === 'passed') {
            o.state = '已通过';
          } else if (o.state === 'delete') {
            o.state = '删除中';
          } else if (o.state === 'deleted') {
            o.state = '已删除';
          }
          o.createTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd');
        });
      }
      const res2 = await this.$xhr('get', DECLARE_GET_RECOMMEND_COUNT);
      if (res2.data.success) {
        this.pages = Math.ceil(res2.data.data / param.rows);
      }
    },
  },
  components: {
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
