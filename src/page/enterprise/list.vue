<template>
  <div>
    <div class="bs-example-search">
      <div class="col-sm-1 txr">
        <label class="label_height">企业名称：</label>
      </div>
      <div class="col-sm-2 ">
        <input type="text" class="form-control iw200" placeholder="请输入企业名称：" v-model="name">
      </div>
      <div class="col-sm-1 txr">
        <label class="label_height">申报人：</label>
      </div>
      <div class="col-sm-2 ">
        <input type="text" class="form-control iw200" placeholder="请输入申报人" v-model="charger">
      </div>
      <div class="col-sm-1 txr">
        <label class="label_height">企业状态：</label>
      </div>
      <div class="col-sm-2 ">
      <select class="form-control" v-model="state">
        <option value="">请选择</option>
	      <option v-for="(value, key) of selEntState" :value="key">{{value}}</option>
	    </select>
      </div>
      <div class="form-group col-sm-3">
        <button class="btn js-ajax-submit" @click="search(1)">搜索</button>
      </div>
    </div>
    <br/>
    <br/>
    <div class="bs-example">
      <span class="t_nav">&#12288;企业列表</span>
      <br/>
      <br/>
      <br/>
      <div v-show="lists.length > 0">
        <table class="table table-bordered">
            <thead>
              <tr>
                <th>企业名称</th>
                <th>状态</th>
                <th>申报人</th>
                <th>申报时间</th>
                <th>生码数量(万)</th>
                <th>补贴金额 <span class="glyphicon glyphicon-question-sign"></span></th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of lists">
                <td>{{item.name}}</td>
                <td v-show="item.reason" style="color: #ac2925;">{{item.state}} <span class="glyphicon glyphicon-question-sign"></span>{{item.reason}}</td>
                <td v-show="!item.reason">{{item.state}}</td>
                <td>{{item.charger}}</td>
                <td>{{item.createtime}}</td>
                <td>{{item.codeCount}}</td>
                <td>{{item.amount}}</td>
                <td>
                  <router-link v-show="item.detailShow" :to="'/ent/detail/'+item.id">查看</router-link>
                  <router-link v-show="item.eidtShow" :to="'/decEnt/edit/'+item.id">修改</router-link>
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
import { DECLARE_GET_ENTERPRISE_LIST, DECLARE_GET_ENTERPRISE_COUNT } from '@/config/env';
import { formatDate } from '@/config/utils';

export default {
  name: 'entList',
  data() {
    return {
      showImg: false,
      lists: [],
      name: '',
      charger: '',
      state: '',
      page: 1,
      rows: 10,
      pages: 0,
      selEntState: {
        waitPending: '待初审',
        waitUnPending: '初审未通过',
        waitPended: '初审通过',
        waitAudit: '待审核',
        unPass: '未通过',
        pass: '已通过',
        wait: '待支付',
        pending: '待初审',
        collectting: '待认证官上门采集',
        confirmFailed: '初审未通过',
        reject2: '认证官采集未通过',
        pending2: '待复审',
        confirm2Failed: '复审未通过',
        passed: '通过审核',
        delete: '删除中',
        deleted: '已删除',
      },
    };
  },
  methods: {
    async search(page) {
      const param = {};
      param.name = this.name;
      param.charger = this.charger;
      param.state = this.state;
      if (!page) {
        param.page = this.page;
      } else {
        param.page = page;
      }
      param.rows = this.rows;
      const res = await this.$xhr('get', DECLARE_GET_ENTERPRISE_LIST, param);
      if (res.data.code === 0) {
        this.lists = res.data.data;
        this.lists.forEach((o) => {
          o.eidtShow = false;
          o.detailShow = true;
          if (o.state === 'create') {
            o.state = '添加';
          } else if (o.state === 'waitPending') {
            o.state = '待初审';
          } else if (o.state === 'waitUnPending') {
            o.eidtShow = true;
            o.detailShow = false;
            o.state = '初审未通过';
          } else if (o.state === 'waitPended') {
            o.state = '初审通过';
          } else if (o.state === 'waitAudit') {
            o.state = '待审核';
          } else if (o.state === 'unpass') {
            o.eidtShow = true;
            o.detailShow = false;
            o.state = '未通过';
          } else if (o.state === 'pass') {
            o.state = '已通过';
          } else if (o.state === 'pending') {
            o.state = '待初审';
          } else if (o.state === 'collectting') {
            o.state = '待认证官上门采集';
          } else if (o.state === 'confirmFailed') {
            o.eidtShow = true;
            o.detailShow = false;
            o.state = '初审未通过';
          } else if (o.state === 'reject2') {
            o.eidtShow = true;
            o.detailShow = false;
            o.state = '认证官采集未通过';
          } else if (o.state === 'pending2') {
            o.state = '待复审';
          } else if (o.state === 'confirm2Failed') {
            o.eidtShow = true;
            o.detailShow = false;
            o.state = '复审未通过';
          } else if (o.state === 'passed') {
            o.state = '通过审核';
          } else if (o.state === 'delete') {
            o.state = '删除中';
          } else if (o.state === 'deleted') {
            o.state = '已删除';
          }
          o.createtime = formatDate(new Date(o.createtime), 'yyyy-MM-dd');
        });
      }
      const param2 = {};
      param2.name = this.name;
      param2.charger = this.charger;
      param2.state = this.state;
      const res2 = await this.$xhr('get', DECLARE_GET_ENTERPRISE_COUNT, param2);
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
.bs-example-search {
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
    padding: 50px 50px 75px 50px;
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
.iw200 {
  width: 200px;
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
    width: 150px;
    margin: auto;
    color:#fff;
    background: rgb(1, 200, 83);
}
</style>
