<template>
  <div class="bs-example">
    <span class="t_nav">&#12288;&#12288;申报官列表</span>
    <br/>
    <br/>
    <br/>
    <div v-show="lists.length > 0">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>姓名</th>
            <th>手机号</th>
            <th>审核状态</th>
            <th>添加时间</th>
            <th>考试分数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of lists">
            <td>{{item.name}}</td>
            <td>{{item.cellphone}}</td>
            <td v-show="item.reason" style="color: #ac2925;">{{item.state}} <span class="glyphicon glyphicon-question-sign"></span>{{item.reason}}</td>
            <td v-show="!item.reason">{{item.state}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.score}}</td>
            <td>
              <router-link v-show="item.detailShow" :to="'/officer/detail/1/'+item.id">查看</router-link>
              <a v-show="item.deleteShow" @click="deleteOfficer(item.id)">删除</a> 
              <router-link v-show="item.eidtShow" :to="'/officer/detail/2/'+item.id">修改</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { DECLARE_GET_DECLARER_LIST, DECLARE_DELETE_DECLARER } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'list',
  data() {
    return {
      lists: [],
    };
  },
  methods: {
    async deleteOfficer(id) {
      const res = await this.$xhr('post', `${DECLARE_DELETE_DECLARER}${id}`);
      if (res.data.code === 0) {
        this.init();
      }
    },
    async init() {
      const res = await this.$xhr('get', DECLARE_GET_DECLARER_LIST);
      if (res.data.code === 0) {
        this.lists = res.data.data;
        this.lists.forEach((o) => {
          if (o.score === -1) {
            o.score = '未考试';
          }
          o.deleteShow = false;
          o.eidtShow = false;
          o.detailShow = true;
          if (o.state === 'create') {
            o.state = '添加';
          } else if (o.state === 'waitPending') {
            o.state = '待初审';
          } else if (o.state === 'waitUnPending') {
            o.state = '初审未通过';
            o.eidtShow = true;
            o.detailShow = false;
          } else if (o.state === 'waitPended') {
            o.state = '初审通过';
          } else if (o.state === 'waitAudit') {
            o.state = '待审核';
          } else if (o.state === 'unpass') {
            o.state = '未通过';
            o.eidtShow = true;
            o.detailShow = false;
          } else if (o.state === 'passed') {
            o.state = '已通过';
            o.deleteShow = true;
          } else if (o.state === 'delete') {
            o.state = '删除中';
            o.detailShow = false;
          } else if (o.state === 'deleted') {
            o.state = '已删除';
            o.detailShow = false;
          }

          o.createTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd');
        });
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
    width: 350px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>