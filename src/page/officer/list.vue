<template>
  <div class="index_more">
      <div class="index_chunk">
        <div class="t_nav">&#12288;申报官列表</div>
    <hr>
    <span v-if="lists.length === 0">无数据</span>
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
              <router-link v-show="item.detailShow" :to="'/officer/detail/'+item.id">查看</router-link>
              <a v-show="item.deleteShow" @click="deleteOfficer(item.id)">删除</a>
              <router-link v-show="item.eidtShow" :to="'/officer/edit/'+item.id">修改</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import { DECLARE_GET_DECLARER_LIST, DECLARE_DELETE_DECLARER } from '@/config/env';
import { formatDate } from '@/config/utils';
import { MessageBox } from 'element-ui';

export default {
  name: 'list',
  data() {
    return {
      lists: [],
    };
  },
  methods: {
    deleteOfficer(id) {
      MessageBox({
        title: '提示',
        message: '此操作将永久删除该数据, 是否继续?',
        showCancelButton: true,
        showConfirmButton: true,
        type: 'warning',
      }).then(async () => {
        const res = await this.$http.post(`${DECLARE_DELETE_DECLARER}${id}`);
        if (res.success) {
          this.init();
        }
      }).catch(() => {
      });
    },
    async init() {
      const type = window.sessionStorage.getItem('type');
      const res = await this.$http.get(DECLARE_GET_DECLARER_LIST);
      if (res.success) {
        this.lists = res.data || [];
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
            if (type === '1') {
              o.deleteShow = false;
            } else {
              o.deleteShow = true;
            }
          } else if (o.state === 'delete') {
            o.state = '删除中';
            o.detailShow = false;
          } else if (o.state === 'deleted') {
            o.state = '已删除';
            o.detailShow = false;
          }
          o.createTime = formatDate(new Date(o.createTime), 'yyyy-MM-dd hh:mm:ss');
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

.index_more{background: #f6f7fb; height: 100%;
    position: absolute;
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
input, select{ margin-right: 20px; }
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