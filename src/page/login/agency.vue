<template>
  <div>
    <v-detail-head ></v-detail-head>
    <div class="index_more">
      <div class="index_chunk">
        <div class="t_nav clearfix">&#12288;{{title}}<small class="pull-right" style="font-size: 12px;">联系申报机构请拨打 400-666-6666</small></div>
        <hr>
        <div class="form-inline row clearfix">
          <div class="col-sm-6">
           <v-area @acceptData="setLiveAddress"></v-area>
           <input type="text" class="form-control" placeholder="请输入机构名称或负责人" v-model="name">
         </div>
          <div class="col-sm-6">
            <div class="input-group">
               <button class="btn ss" @click="search(1)" style="height: 35px;">搜索</button>
            </div>
          </div>
        </div>
        <br/>
        <div v-show="resData.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>机构名称</th>
                <th>负责人</th>
                <th>负责区域</th>
                <th v-if="$route.params.type === '1'">地址</th>
                <th v-if="$route.params.type !== '1'">联系方式</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of resData">
                <th scope="row">{{item.id}}</th>
                <td>{{item.name}}</td>
                <td v-if="$route.params.type === '1'">{{item.charger}}</td>
                <td v-if="$route.params.type !== '1'">{{item.chargerName}}</td>
                <td>{{item.chargeAddress}}</td>
                <td v-if="$route.params.type === '1'">{{item.address}}</td>
                <td v-if="$route.params.type !== '1'">{{item.cellphone}}</td>
              </tr>
            </tbody>
          </table>
          <v-pagination :page="pages" @nextPage="search"></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination';
import detailHead from '@/components/header/detailHead';
import area from '@/components/area/area';
import { DECLARE_GET_DECLARE_ORGANIZ, DECLARE_GET_DECLARE_ORGANIZ_COUNT, DECLARE_GET_DECLARE_FWZX, DECLARE_GET_DECLARE_FWZX_COUNT } from '@/config/env';

export default {
  name: 'agency',
  data() {
    return {
      title: '',
      areaCode: '',
      api: '',
      apiC: '',
      name: '',
      page: 1,
      rows: 10,
      pages: 0,
      resData: [],
    };
  },
  components: {
    'v-pagination': pagination,
    'v-detail-head': detailHead,
    'v-area': area,
  },
  methods: {
    async search(page) {
      const param = {};
      param.areaCode = this.areaCode;
      param.name = this.name;
      if (!page) {
        param.page = this.page;
      } else {
        param.page = page;
      }
      param.rows = this.rows;
      const res = await this.$http.get(this.api, param);
      if (res.success) {
        this.resData = res.data;
      }
      const param2 = {};
      param2.areaCode = this.areaCode;
      param2.name = this.name;
      const resC = await this.$http.get(this.apiC, param2);
      if (resC.success) {
        this.pages = Math.ceil(resC.data / this.rows);
      }
    },
    setLiveAddress(d) {
      this.areaCode = d;
    },
  },
  mounted() {
    if (this.$route.params.type === '1') {
      this.title = '申报机构';
      this.api = DECLARE_GET_DECLARE_ORGANIZ;
      this.apiC = DECLARE_GET_DECLARE_ORGANIZ_COUNT;
    } else if (this.$route.params.type === '2') {
      this.title = '市级管理中心';
      this.api = `${DECLARE_GET_DECLARE_FWZX}3`;
      this.apiC = `${DECLARE_GET_DECLARE_FWZX_COUNT}3`;
    } else if (this.$route.params.type === '3') {
      this.title = '省级服务中心';
      this.api = `${DECLARE_GET_DECLARE_FWZX}2`;
      this.apiC = `${DECLARE_GET_DECLARE_FWZX_COUNT}2`;
    }
    this.search(1);
  },
};
</script>

<style lang="scss" scoped>
.index_more{    padding: 250px 60px 50px;background: #f6f7fb;}
.index_chunk{ background:#fff; padding: 40px 70px 55px;border-radius: 4px; box-shadow: 0px 20px 20px -20px #ddd;}
.t_nav {
  border-left: #4786ff solid 3px;
  font-size: 18px;
}
table{ border:1px solid #eee; }
.table>thead>tr>th{ border-bottom: none; }
.table>thead>tr>th,.table>tbody>tr>td,.table>tbody>tr>th{ padding: 15px; }
input, select{ margin-right: 20px; }
.ss {
    width: 110px;
    margin: auto;
    color: #fff;
    border-color: rgb(1, 200, 83);
    background-color: rgb(1, 200, 83);
}
.container {
  padding: 0px 55px;
}
.bs-example {
    background-color: #fff;
    border: 1px solid #ddd;
    -webkit-border-top-left-radius: 4px;
    -webkit-border-top-right-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -moz-border-radius-topright: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: 15px 0;
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
small {
  color: #999;
}
</style>