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
        <input type="text" class="form-control iw200" placeholder="请输入申报人" v-model="declarer">
      </div>
      <div class="col-sm-1 txr">
        <label class="label_height">企业状态：</label>
      </div>
      <div class="col-sm-2 ">
      <select class="form-control" v-model="state">
	      <option v-for="(value, key) of selEntState" :value="key">{{value}}</option>
	    </select>
      </div>
      <div class="form-group col-sm-3">
        <button class="btn js-ajax-submit">搜索</button>
      </div>
    </div>
    <br/>
    <br/>
    <div class="bs-example">
      <span class="t_nav">&#12288;&#12288;企业列表</span>
      <br/>
      <br/>
      <br/>
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
              <th scope="row">{{item.name}}</th>
              <td style="color: #ac2925;">{{item.state}} <span class="glyphicon glyphicon-question-sign"></span>{{item.reason}}</td>
              <td>{{item.declarer}}</td>
              <td>{{item.createtime}}</td>
              <td>{{item.codeCount}}</td>
              <td>{{item.amount}}</td>
              <td>
                <router-link to="/entListdetail">查看</router-link>
                <a>删除</a> 
                <router-link to="/entListedit">修改</router-link>
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
  name: 'entList',
  data() {
    return {
      showImg: false,
      lists: [],
      name: '',
      declarer: '',
      state: '',
      page: 1,
      row: 20,
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
      },
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
          id: '1',
          name: '四川中新华搜信息技术有限公司',
          state: '审核未通过',
          reason: '原因',
          declarer: '申报人',
          createtime: '2018-02-27',
          codeCount: '15000000',
          amount: '10000',
        },
        {
          id: '2',
          name: '四川中新华搜信息技术有限公司',
          state: '审核未通过',
          reason: '原因',
          declarer: '申报人',
          createtime: '2018-02-27',
          codeCount: '150(万)',
          amount: '10000',
        },
      ];
      this.pages = 10;
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
