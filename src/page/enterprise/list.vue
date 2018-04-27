<template>
  <div class="index_more">
    <div class="index_chunk">
    <div class="form-inline">
      <div class="form-group txr">
        <label class="label_height">企业名称：</label>
        <input type="text" class="form-control iw200" placeholder="请输入企业名称：" v-model="name">
      </div>
      <div class="form-group txr">
        <label class="label_height">申报人：</label>
        <input type="text" class="form-control iw200" placeholder="请输入申报人" v-model="charger">
      </div>
      <div class="form-group txr">
        <label class="label_height">企业状态：</label>
     
      <select class="form-control" v-model="state">
        <option value="">请选择</option>
	      <option v-for="(value, key) of selEntState" :value="key">{{value}}</option>
	    </select>
      </div>
      <div class="form-group">
        <button class="btn js-ajax-submit" @click="search(1)" style="height: 35px;">搜索</button>
      </div>
    </div>
</div>
    <div class="index_chunk">
    
      <div class="t_nav">&#12288;企业列表</div>
      <hr>
      <span v-if="lists.length === 0">无数据</span>
      <div v-show="lists.length > 0">
        <table class="table">
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
                <td v-show="item.reason" style="color: #ac2925;">{{selEntState[item.state]}} <span class="glyphicon glyphicon-question-sign"></span>{{item.reason}}</td>
                <td v-show="!item.reason">{{selEntState[item.state]}}</td>
                <td>{{item.declarerName}}</td>
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
        waitPending: '申报材料待初审',
        waitUnPending: '申报材料初审未通过',
        waitPended: '申报材料初审通过',
        waitAudit: '申报材料待复审',
        unPass: '申报材料复审未通过',
        pass: '申报材料复审已通过',
        wait: '系统服务费待支付',
        pending: '入库材料待初审',
        collectting: '待认证官上门采集',
        confirmFailed: '入库材料初审未通过',
        reject2: '认证官采集未完成',
        pending2: '认证材料待复审',
        confirm2Failed: '认证材料复审未通过',
        passed: '认证材料复审已通过',
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
          if (o.state === 'waitUnPending') {
            o.eidtShow = true;
            o.detailShow = false;
          } else if (o.state === 'unPass') {
            o.eidtShow = true;
            o.detailShow = false;
          } else if (o.state === 'confirmFailed') {
            o.eidtShow = true;
            o.detailShow = false;
          } else if (o.state === 'reject2') {
            o.eidtShow = true;
            o.detailShow = false;
          } else if (o.state === 'confirm2Failed') {
            o.eidtShow = true;
            o.detailShow = false;
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

.index_more{background: #f6f7fb;
    position: absolute;
    height: 100%;
    width: 100%;}
.index_chunk{ 
  margin-bottom: 40px;
position: relative;
top:120px;
left: 19%;
width: 78%;
background:#fff; 
padding: 55px 70px 35px;
border-radius: 4px; 
box-shadow: 0px 20px 20px -20px #ddd;}
label{ margin-bottom:0; }
.form-group{ margin-bottom:20px; margin-right: 15px; }
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
