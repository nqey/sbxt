<template>
  <div>
    <v-lhead ></v-lhead>
    <div class="col-sm-12 container">
      <div class="col-sm-12 bs-example">
        <span class="t_nav"><router-link to="/login">&#12288;首页</router-link>&#12288;>&#12288;申报机构</span>
        <small>&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;&#12288;联系申报机构请拨打 400-666-6666</small>
        <br/>
        <br/>
        <br/>
        <div class="form-inline clearfix">
          <div class="col-sm-5">
           <v-agencyarea @acceptData="makeData"></v-agencyarea>
         </div>
          <div class="col-sm-7">
            <div class="input-group">
               <button class="btn ss" @click="search">搜索</button>
            </div>
          </div>
        </div>
         
        <br/>
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
</template>

<script>
import logo from '@/assets/img/logo.png';
import pagination from '@/components/pagination';
import lhead from '@/components/registerHead/lhead';
import agencyArea from '@/components/reegionalCascade/agencyArea';

export default {
  name: 'agency',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      logo,
      pages: 1,
      rows: 20,
      obj: [],
      resData: [],
    };
  },
  components: {
    'v-pagination': pagination,
    'v-lhead': lhead,
    'v-agencyarea': agencyArea,
  },
  methods: {
    search() {
      // console.log(this.obj);
      this.pages = 10;
      this.resData = [
        {
          id: '001',
          name: '北京申报机构',
          charger: '曾艳',
          chargeAddress: '四川成都',
          address: '海港广场15座',
        },
        {
          id: '002',
          name: '北京申报机构',
          charger: '曾艳',
          chargeAddress: '四川成都',
          address: '海港广场15座',
        },
        {
          id: '003',
          name: '北京申报机构',
          charger: '曾艳',
          chargeAddress: '四川成都',
          address: '海港广场15座',
        },
        {
          id: '004',
          name: '北京申报机构',
          charger: '曾艳',
          chargeAddress: '四川成都',
          address: '海港广场15座',
        },
        {
          id: '005',
          name: '北京申报机构',
          charger: '曾艳',
          chargeAddress: '四川成都',
          address: '海港广场15座',
        },
      ];
    },
    makeData(d) {
      this.obj = Object.assign(this.obj, d);
    },
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