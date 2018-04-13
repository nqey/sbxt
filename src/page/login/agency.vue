<template>
  <div>
    <v-detail-head ></v-detail-head>
    <div class="col-sm-12 container">
      <div class="col-sm-12 bs-example">
        <span class="t_nav">&#12288;{{title}}</span>
        <small>&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;联系申报机构请拨打 400-666-6666</small>
        <br/>
        <br/>
        <br/>
        <div class="form-inline clearfix">
          <div class="col-sm-6">
           <v-geo-area @acceptData="setLiveAddress"></v-geo-area>
           <input type="text" class="form-control" placeholder="请输入机构名称或负责人" v-model="name">
         </div>
          <div class="col-sm-6">
            <div class="input-group">
               <button class="btn ss" @click="search(1)">搜索</button>
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
                <th>地址</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item of resData">
                <th scope="row">{{item.id}}</th>
                <td>{{item.name}}</td>
                <td>{{item.charger}}</td>
                <td>{{item.chargeAddress}}</td>
                <td>{{item.address}}</td>
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
import vGeoArea from '@/components/reegionalCascade/geoArea';
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
    'v-geo-area': vGeoArea,
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
      const res = await this.$xhr('get', this.api, param);
      if (res.data.code === 0) {
        this.resData = res.data.data;
      }
      const param2 = {};
      param2.areaCode = this.areaCode;
      param2.name = this.name;
      const resC = await this.$xhr('get', this.apiC, param2);
      if (resC.data.success) {
        this.pages = Math.ceil(resC.data.data / this.rows);
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
      this.api = DECLARE_GET_DECLARE_FWZX;
      this.apiC = DECLARE_GET_DECLARE_FWZX_COUNT;
    } else if (this.$route.params.type === '3') {
      this.title = '省级服务中心';
      this.api = DECLARE_GET_DECLARE_ORGANIZ;
      this.apiC = DECLARE_GET_DECLARE_FWZX_COUNT;
    }
    this.search(1);
  },
};
</script>

<style lang="scss" scoped>
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