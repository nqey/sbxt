<template>
  <div class="index_more">
      <div class="index_chunk">
    <div class="t_nav">&#12288;推荐列表</div>
    <hr>
	<span v-if="lists.length === 0">无数据</span>
    <div v-show="lists.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th>机构名称</th>
            <th>负责人</th>
            <th>状态</th>
            <th>申报时间</th>
            <th>联系电话</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of lists">
            <td>{{item.name}}</td>
            <td>{{item.declarer}}</td>
            <td v-show="item.reason" style="color: #ac2925;">{{status[item.state]}} <span class="glyphicon glyphicon-question-sign"></span>{{item.reason}}</td>
            <td v-show="!item.reason">{{status[item.state]}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.tellphone}}</td>
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
      status: {
        baseWaitSubmit: '基本信息待填写',
        baseWaitPending: '基本信息待初审',
        baseWaitAudit: '基本信息待审核',
        baseUnPass: '基本信息未通过',
        registWaitSubmit: '登记信息待填写',
        registWaitPending: '登记信息待初审',
        registWaitAudit: '登记信息待审核',
        registUnPass: '登记信息未通过',
        delete: '已删除',
        passed: '通过审核',
      },
    };
  },
  methods: {
    async search(page) {
      const param = {
        page: page || this.page,
        rows: this.rows,
      };
      const res = await this.$http.get(DECLARE_GET_RECOMMEND, param);
      if (res.success) {
        this.lists = res.data || [];
        this.lists.forEach((o) => {
          o.createTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd hh:mm:ss');
        });
      }
      const res2 = await this.$http.get(DECLARE_GET_RECOMMEND_COUNT);
      if (res2.success) {
        this.pages = Math.ceil(res2.data / param.rows);
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
